import axios from 'axios'

export const createCypressRestClient = (
  baseUrl: string,
  accessToken: string,
  idToken: string,
) =>
  axios.create({
    baseURL: new URL('api', baseUrl).toString(),
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessToken}`,
      // 'Content-Type': 'application/json',
      // 'X-ID-TOKEN': idToken,
    },
  })
