import {Server} from "./presentation/server"
import AppConfig from './domain/config'
import {AppRoutes} from "./presentation/routes"

(() => {
    main()
})()

function main() {
    new Server({port:AppConfig.PORT,routes:AppRoutes.routes}).start()
}