import { get } from 'env-var'

export class GoogleConfig {
  public static readonly GOOGLE_CLIENT_ID: string = get('GOOGLE_CLIENT_ID')
    // .required()
    .asString() as string

  public static readonly GOOGLE_CALLBACK_URL: string = get(
    'GOOGLE_CALLBACK_URL',
  )
    // .required()
    .asString() as string

  public static readonly GOOGLE_AUTH_URL: string = get('GOOGLE_AUTH_URL')
    // .required()
    .asString() as string

  public static readonly GOOGLE_CLIENT_SECRET: string = get(
    'GOOGLE_CLIENT_SECRET',
  )
    // .required()
    .asString() as string
}
