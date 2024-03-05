import { getEnv } from '@codelab/shared/config'
import axios from 'axios'

// export const restPlatformClient = axios.create({
//   baseURL: new URL('api', getEnv().endpoint.platformHost).toString(),
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//   },
// })

// restPlatformClient.interceptors.response.use(
//   (response) => {
//     // console.log(response)

//     return response
//   },
//   (error) => {
//     console.error(error)
//     throw new Error(error.response ? error.response.data : 'Network error')
//   },
// )

export const restPlatformApiClient = axios.create({
  baseURL: new URL('api', getEnv().endpoint.platformApiHost).toString(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    credentials: 'include',
  },
  withCredentials: true,
})

restPlatformApiClient.interceptors.response.use(
  (response) => {
    // console.log(response)

    return response
  },
  (error) => {
    console.error(error)
    throw new Error(error.response ? error.response.data : 'Network error')
  },
)
