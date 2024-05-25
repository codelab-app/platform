import { getEnv } from '@codelab/shared/config'
import axios from 'axios'

export const restWebClient = axios.create({
  baseURL: new URL('api', getEnv().endpoint.webHost).toString(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

restWebClient.interceptors.response.use(
  (response) => {
    // console.log(response)

    return response
  },
  (error) => {
    console.error(error)
    throw new Error(error.response ? error.response.data : 'Network error')
  },
)

export const restApiClient = axios.create({
  baseURL: new URL('api', getEnv().endpoint.apiHost).toString(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

restApiClient.interceptors.response.use(
  (response) => {
    // console.log(response)

    return response
  },
  (error) => {
    console.error(error)
    throw new Error(error.response ? error.response.data : 'Network error')
  },
)
