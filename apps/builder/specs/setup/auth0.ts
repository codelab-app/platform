import { IUserDTO } from '@codelab/frontend/abstract/core'
import { IDTokenPayload, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { Config } from '@codelab/shared/config'
import axios, { AxiosRequestConfig } from 'axios'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'

export interface Auth0FileData extends IUserDTO {
  access_token: string
  email: string
}

interface PasswordGrantTypeResponse {
  access_token: string
  id_token: string
  scope: string
  expires_in: number
  token_type: string
}

const auth0DataFilePath = path.resolve(__dirname, 'auth0-token.json')

/**
 * If file doesn't exist, create it
 */
export const loadAuth0DataFromFile = (): Auth0FileData => {
  const exists = fs.existsSync(auth0DataFilePath)

  if (!exists) {
    fs.writeFileSync(
      auth0DataFilePath,
      JSON.stringify({
        access_token: '',
        auth0_user_id: '',
        email: '',
      }),
    )
  }

  return JSON.parse(fs.readFileSync(auth0DataFilePath, 'utf8'))
}

export const auth0UserInfo = async (accessToken: string) => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: new URL('userinfo', Config().auth0.issuer_base_url).href,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }

  return axios.request(options).then(({ data }) => {
    return data
  })
}

/**
 * We require a way to login as a user programmatically, the initial attempt using M2M doesn't work because that doesn't create a user session.
 *
 * The docs were hard to find, solution was found here
 *
 * https://community.auth0.com/t/api-login-with-email-and-password/10712/7
 * https://github.com/auth0-samples/react-native-embedded-login/blob/master/actions/auth/index.js#L31
 *
 * Then learned about password-realm grant-type which led to the docs here
 *
 * https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-resource-owner-password-flow
 *
 */
export const passwordRealmGrantType = async (): Promise<Auth0FileData> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: new URL('oauth/token', Config().auth0.issuer_base_url).href,
    data: {
      grant_type: 'password',
      username: Config().auth0.cypress_username,
      password: Config().auth0.cypress_password,
      audience: Config().auth0.audience,
      scope: 'openid profile email',
      client_id: Config().auth0.client_id,
      client_secret: Config().auth0.client_secret,
    },
  }

  return axios.request<PasswordGrantTypeResponse>(options).then(({ data }) => {
    const user = jwt.decode(data.id_token) as IDTokenPayload

    const auth0Data = {
      access_token: data.access_token,
      id: user.sub,
      auth0Id: user.sub,
      email: user.email,
      roles: user[JWT_CLAIMS].roles,
      username: user.nickname,
      apps: [],
    }

    fs.writeFileSync(auth0DataFilePath, JSON.stringify(auth0Data))

    return auth0Data
  })
}
