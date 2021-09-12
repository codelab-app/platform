import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthenticationClient } from 'auth0'
import axios from 'axios'

const httpClient = axios.create({
  timeout: 5000,
  baseURL: 'https://codelab-ai-test.us.auth0.com',
})

const authClient = new AuthenticationClient({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  domain: new URL(`${process.env.AUTH0_ISSUER_BASE_URL}`).hostname,
})

@Controller('auth0')
export class Auth0Controller {
  @Post()
  test(@Body() body: any) {
    console.log(body)
  }

  /**
   * This tests our post registration hook on Auth0
   */
  @Get()
  async index() {
    // const { access_token } = await authClient.clientCredentialsGrant({
    //   audience: `${process.env.AUTH0_AUDIENCE}`,
    // })
    const { access_token } = await authClient.passwordGrant({
      username: 'admin@codelab.ai',
      password: 'a!LcxKZB6W@f',
      audience: `${process.env.AUTH0_AUDIENCE}`,
      scope: 'openid email profile',
    })

    console.log(access_token)

    return await httpClient
      .request({
        url: 'userinfo',
        method: 'GET',
        // data: { data: [] },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
  }
}
