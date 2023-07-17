import * as env from 'env-var'

export interface IVercelKVEnvVars {
  restApiToken: string
  restApiUrl: string
}

export class VercelKVEnvVars implements IVercelKVEnvVars {
  private _restApiUrl?: string

  private _restApiToken?: string

  get restApiUrl(): string {
    return (this._restApiUrl ??= env
      .get('KV_REST_API_URL')
      .required()
      .asString())
  }

  get restApiToken(): string {
    return (this._restApiToken ??= env
      .get('KV_REST_API_TOKEN')
      .required()
      .asString())
  }
}
