import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

type EndpointConfig = {
  [endpointName: string]: AxiosRequestConfig
}

export class Endpoint {
  private readonly config: EndpointConfig

  constructor(config: EndpointConfig) {
    this.config = config
  }

  onFinish = (action: any) => async (
    values: any,
  ): Promise<AxiosResponse<any>> => {
    const axiosConfig: AxiosRequestConfig = this.config[action]

    return axios({
      ...axiosConfig,
      data: values,
    }).then((res) => {
      return res
    })
  }
}
