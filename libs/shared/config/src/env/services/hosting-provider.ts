import * as env from 'env-var'

export interface IHostingProviderEnvVars {
  apiUrl: string
  domainsApiUrl: string
  dropletApiUrl: string

  getBaseHeaders(): HeadersInit
}

export class HostingProviderEnvVars implements IHostingProviderEnvVars {
  get accessToken() {
    return (this._accessToken ??= env
      .get('DIGITAL_OCEAN_API_TOKEN')
      .required()
      .asString())
  }

  get dropletName() {
    return (this._dropletName ??= env
      .get('DIGITAL_OCEAN_DROPLET_NAME')
      .required()
      .asString())
  }

  readonly apiUrl = 'https://api.digitalocean.com/v2'

  readonly domainsApiUrl = `${this.apiUrl}/domains`

  readonly dropletApiUrl = `${this.apiUrl}/droplets?name=${this.dropletName}`

  getBaseHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    }
  }

  private _accessToken?: string

  private _dropletName?: string
}
