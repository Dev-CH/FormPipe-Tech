import { AxiosRequestConfig, RawAxiosResponseHeaders } from 'axios'

export interface ApiResponse<T> {
  total: number
  data: T
}

export type ClientRequest<TResponseData> = AxiosRequestConfig<TResponseData>

export type ClientResponse<TResponseData> = {
  data: TResponseData
  headers: RawAxiosResponseHeaders
}
