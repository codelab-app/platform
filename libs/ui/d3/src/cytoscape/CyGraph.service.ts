import axios, { AxiosInstance } from 'axios'
import { ISrcTarget } from './ICyGraphProps'

export class CyGraphService {
  axiosService: AxiosInstance

  constructor() {
    this.axiosService = axios.create({
      baseURL: 'http://localhost:4004/graph/',
    })
  }

  callServerWithEndpoint(endpoint: string, srcTarget?: ISrcTarget) {
    let url = endpoint

    if (srcTarget) {
      url = `${endpoint}?move=true&source=${srcTarget.source}&target=${srcTarget.target}`
    }

    return this.axiosService.get(url)
  }
}
