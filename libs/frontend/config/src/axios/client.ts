import { getEnv } from '@codelab/shared/config'
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: new URL('api/data', getEnv().endpoint.platformApiHost).toString(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.response.use(
  (response) => {
    console.log(response)

    return response
  },
  (error) => {
    throw new Error(error.response ? error.response.data : 'Network error')
  },
)
