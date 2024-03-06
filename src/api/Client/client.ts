import axios, { AxiosError, AxiosInstance, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { ClientRequest, ClientResponse } from '../types';

class Client {
    #client: AxiosInstance;

    constructor() {
        this.#client = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 5000,
            headers: this.#setHeaders(),
        });
    }

    #setHeaders(): RawAxiosRequestHeaders {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    request<TResponseData, TRequestData = any>(
        config: ClientRequest<TRequestData>
    ): Promise<ClientResponse<TResponseData>> {
        return new Promise<ClientResponse<TResponseData>>((resolve) => {
            this.#client
                .request<
                    TResponseData,
                    AxiosResponse<TResponseData>,
                    TRequestData
                >(config)
                .then((response) => {
                    resolve({
                        data: response.data,
                        headers: response.headers,
                    });
                })
                .catch((e: AxiosError) => {
                    throw new Error(e.message);
                });
        });
    }
}

export default Client;
