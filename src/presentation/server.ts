import express, {Router} from 'express'
import * as http from "http";
import {DbSequelize} from "../infrastructure/database/init";
import {Rabbitmq} from "../infrastructure/eventbus/rabbitmq";

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

    public start() {
        DbSequelize().then(async ()=> {
            await Rabbitmq.init()
            this.app.use(express.json())
            this.app.use(this.routes)
            const server = http.createServer(this.app)
            server.listen(this.port,()=> {
                console.log(`Server running on PORT: ${this.port}`)
            })
        }).catch((err) => {
            console.error(err)
        })
    }
}