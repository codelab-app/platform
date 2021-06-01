import { ConfigFactory } from '@nestjs/config'

export const auth0Provider = {
  provide: 'Auth0Provider',
  useFactory: (config: ConfigFactory<any>) => {
    //
  },
}
