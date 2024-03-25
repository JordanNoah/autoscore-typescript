import axios, {AxiosInstance} from "axios";

export class ExternalApiRepository {
    private readonly axiosInstance: AxiosInstance

    constructor() {
        this.axiosInstance = axios.create()
    }
    setBaseURL(baseURL:string): void {
        this.axiosInstance.defaults.baseURL = baseURL
    }

}