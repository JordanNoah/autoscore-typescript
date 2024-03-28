import express, {Router} from 'express'
import * as http from "http";
import {DbSequelize} from "../infrastructure/database/init";
import {Rabbitmq} from "../infrastructure/eventbus/rabbitmq";
import {Cron} from "../infrastructure/cron";

interface Options {
    port: number,
    routes: Router
}

export class Server {
    public readonly app = express()
    private readonly port: number
    private readonly routes: Router

    constructor(options: Options) {
        const {port,routes} = options
        this.port = port
        this.routes = routes
    }

    public async start() {
        try {
            await DbSequelize()
            await Rabbitmq.init()
            new Cron().userNotFound()
            new Cron().processWaitingToSend()
            new Cron().cleaner()
            this.app.use(express.json())
            this.app.use(this.routes)
            const server = http.createServer(this.app)
            server.listen(this.port,()=> {
                console.log(`Server running on PORT: ${this.port}`)
            })
        }catch (error) {
            console.error(error)
        }
    }
}