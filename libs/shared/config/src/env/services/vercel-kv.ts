import * as env from 'env-var'

export interface IVercelKVEnvVars {
  restApiToken: string
  restApiUrl: string
}

export class VercelKVEnvVars implements IVercelKVEnvVars {
  get restApiToken(): string {
    return (this._restApiToken ??= env
      .get('KV_REST_API_TOKEN')
      .required()
      .asString())
  }

  get restApiUrl(): string {
    return (this._restApiUrl ??= env
      .get('KV_REST_API_URL')
      .required()
      .asString())
  }

  private _restApiToken?: string

  private _restApiUrl?: string
}
