import axios from 'axios'
import * as env from 'env-var'

export interface IServerlessqEnvVars {
  apiKey: string
  baseUrl: string
}

export class ServerlessqEnvVars implements IServerlessqEnvVars {
  get baseUrl() {
    const queryString = new URLSearchParams({
      // Queue ID
      id: '85ef2769-9fe8-420e-8c69-fa39e3a1e2cc',
      // Endpoint
      target: 'https://catfact.ninja/fact',
    })

    return `https://api.serverlessq.com?${queryString.toString()}`
  }

  get apiKey() {
    return env.get('SERVERLESSQ_API_TOKEN').required().asString()
  }
}
