import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthenticationClient } from 'auth0'
import axios from 'axios'

const httpClient = axios.create({
  timeout: 5000,
  baseURL: 'http://a8069b052300.ngrok.io/',
})

const authClient = new AuthenticationClient({
  clientId: process.env.AUTH0_API_CLIENT_ID,
  clientSecret: process.env.AUTH0_API_CLIENT_SECRET,
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
    const { access_token } = await authClient.clientCredentialsGrant({
      audience: `${process.env.AUTH0_AUDIENCE}`,
    })

    return await httpClient
      .request({
        method: 'POST',
        data: { data: [] },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
  }
}
