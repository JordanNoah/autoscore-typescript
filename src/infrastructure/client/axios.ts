import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, any>;
    config: AxiosRequestConfig;
    request?: any;
}

export class Axios {
    private static instance:Axios
    private readonly axiosInstance: AxiosInstance

    private constructor(
        baseUrl: string
    ) {
        this.axiosInstance = axios.create({
            baseURL:baseUrl,
            timeout:5000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    public static getInstance(baseURL: string): Axios{
        if(!this.instance) {
            this.instance = new Axios(baseURL);
        }
        return this.instance;
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    public async get<T>(url:string, config?: AxiosRequestConfig): Promise<T>{
        return this.axiosInstance.get(url,config)
    }

    public async post<T>(data?: object, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post('', data, config)

        if (response && response.data) {
            return response.data as T;
        } else {
            throw new Error("No data in response");  // Handle the case where there's no data
        }
    }
}