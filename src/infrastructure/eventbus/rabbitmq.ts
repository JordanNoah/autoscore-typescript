import {Channel, connect, Connection} from 'amqplib'
import {assertExchange, assertQueue, config, eventList} from './config'
import AppConfig from "../../domain/config"
import {EventDto} from "../../domain/dtos/events/event.dto";

export class Rabbitmq {
    private static _connection: Connection
    private static _channel: Channel

    public static async connection() {
        this._connection = await connect(config)
        this._channel = await this._connection.createConfirmChannel()
    }

    public static async setQueue() {
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
    }

    public static async consume() {
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