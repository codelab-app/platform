import * as env from 'env-var'

export interface IHostingProviderEnvVars {
  apiUrl: string
  appApiUrl: string
  appId: string

  getBaseHeaders(): HeadersInit
}

export class HostingProviderEnvVars implements IHostingProviderEnvVars {
  get accessToken() {
    return (this._accessToken ??= env
      .get('DIGITAL_OCEAN_API_TOKEN')
      .required()
      .asString())
  }

  get appId() {
    return (this._appId ??= env
      .get('DIGITAL_OCEAN_APP_ID')
      .required()
      .asString())
  }

  readonly apiUrl = 'https://api.digitalocean.com/v2/apps/'

  readonly appApiUrl = `${this.apiUrl}${this.appId}`

  getBaseHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    }
  }

  private _accessToken?: string

  private _appId?: string
}
