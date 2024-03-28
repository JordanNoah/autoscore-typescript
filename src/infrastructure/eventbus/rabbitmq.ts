import {Channel, connect, Connection} from 'amqplib'
import {assertExchange, assertQueue, config, eventList} from './config'
import AppConfig from "../../domain/config"
import {EventDto} from "../../domain/dtos/events/event.dto";

export class Rabbitmq {
    private static _connection: Connection
    private static _channel: Channel

    public static async connection() {
        try {
            this._connection = await connect(config)
            this._channel = await this._connection.createConfirmChannel()
        }catch (e) {
            console.log(e)
        }
    }

    public static async setQueue() {
        if (this._channel){
            await this._channel.assertQueue(
                AppConfig.RABBIT_QUEUE,
                assertQueue
            )

            await this._channel.assertExchange(
                AppConfig.RABBIT_EXCHANGE,
                AppConfig.RABBIT_TYPE_EXCHANGE,
                assertExchange
            )

            await this._channel.bindQueue(
                AppConfig.RABBIT_QUEUE,
                AppConfig.RABBIT_EXCHANGE,
                AppConfig.RABBIT_ROUTING_KEY
            )

            await this._channel.prefetch(Number(AppConfig.RABBIT_PREFETCH))
        } else {
            console.log("Channel not found")
        }
    }

    public static async consume() {
        if (this._channel){
            await this._channel.consume(
                AppConfig.RABBIT_QUEUE,
                async (msg) => {
                    try {
                        const [error,eventDto] = EventDto.create(msg!)
                        await this.messageProcessor(eventDto!)
                    } catch (error) {
                        console.log(error)
                    }
                }
            )
        }else{
            console.log("Channel not found")
        }
    }

    private static async messageProcessor(msg: EventDto) {
        const [message,error] = this.middleware(msg)
        if (!error){
            const eventProcessor = eventList.get(msg.properties.type)
            if (eventProcessor){
                await eventProcessor(JSON.parse(msg.content))
            } else {
                console.error(`Event not found: ${msg.properties.type}`);
            }
        }else{
            console.log(message);
        }
        this._channel.ack(msg)
    }

    private static middleware(msg: EventDto): [string?, boolean?] {
        if (!this.checkAppId(msg.properties.appId)) return ['Incorrect app id', true]
        return [undefined,false]
    }

    private static checkAppId(appId: string): boolean {
        return appId == 'academic-administration.sign-ups' ?? false
    }

    public static async init() {
        await this.connection()
        await this.setQueue()
        await this.consume()
        //await this.fakeConsume()
    }
}