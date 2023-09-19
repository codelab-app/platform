import { getEnv } from '@codelab/shared/config'
import axios from 'axios'

export const restClient = axios.create({
  baseURL: new URL(
    'api/data',
    getEnv().endpoint.nextPublicPlatformHost,
  ).toString(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

restClient.interceptors.response.use(
  (response) => {
    // console.log(response)

    return response
  },
  (error) => {
    console.error(error)
    throw new Error(error.response ? error.response.data : 'Network error')
  },
)
