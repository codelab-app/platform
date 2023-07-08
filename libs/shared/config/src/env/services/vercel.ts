import * as env from 'env-var'

type VercelStage = 'development' | 'preview' | 'production'

export interface IVercelEnvVars {
  isVercel: boolean
  isVercelPreview: boolean
  nextPublicVercelEnv?: VercelStage
  nextPublicVercelUrl?: string
  teamIdParam: string
  vercel: boolean
  vercelAccessToken: string
  vercelEnv?: VercelStage
  vercelProjectId: string
  vercelTeamId: string

  domainApiUrl(apiVersion?: string): string
  getBaseHeaders(): HeadersInit
  projectApiUrl(apiVersion?: string): string
}

export class VercelEnvVars implements IVercelEnvVars {
  private _vercelAccessToken?: string

  private _vercelProjectId?: string

  private _vercelTeamId?: string

  private _vercelEnv?: VercelStage

  private _nextPublicVercelEnv?: VercelStage

  private _nextPublicVercelUrl?: string

  private _vercel?: boolean

  readonly apiUrl = 'https://api.vercel.com'

  get vercelAccessToken() {
    return (this._vercelAccessToken ??= env
      .get('VERCEL_ACCESS_TOKEN')
      .required()
      .asString())
  }

  get vercelProjectId() {
    return (this._vercelProjectId ??= env
      .get('VERCEL_PLATFORM_PROJECT_ID')
      .required()
      .asString())
  }

  get vercelTeamId() {
    return (this._vercelTeamId ??= env
      .get('VERCEL_TEAM_ID')
      .required()
      .asString())
  }

  get vercelEnv() {
    return (this._vercelEnv ??= env
      .get('VERCEL_ENV')
      .asEnum(['development', 'preview', 'production']))
  }

  get nextPublicVercelEnv() {
    return (this._nextPublicVercelEnv ??= env
      .get('NEXT_PUBLIC_VERCEL_ENV')
      .asEnum(['development', 'preview', 'production']))
  }

  get nextPublicVercelUrl() {
    return (this._nextPublicVercelUrl ??= env
      .get('NEXT_PUBLIC_VERCEL_URL')
      .asString())
  }

  get vercel() {
    return (this._vercel ??= env.get('VERCEL').default('false').asBool())
  }

  projectApiUrl(apiVer = '9') {
    return `${this.apiUrl}/v${apiVer}/projects/${this.vercelProjectId}`
  }

  getBaseHeaders() {
    return {
      Authorization: `Bearer ${this.vercelAccessToken}`,
      'Content-Type': 'application/json',
    }
  }

  get teamIdParam() {
    return `teamId=${this.vercelTeamId}`
  }

  domainApiUrl(apiVer = '6') {
    return `${this.apiUrl}/v${apiVer}/domains`
  }

  get isVercel() {
    return this.vercel || Boolean(this.nextPublicVercelEnv)
  }

  /**
   * Should be true only for preview environment, not for production
   */
  get isVercelPreview() {
    return (
      this.vercelEnv === 'preview' || this.nextPublicVercelEnv === 'preview'
    )
  }

  get isProduction() {
    return (
      this.vercelEnv === 'production' ||
      this.nextPublicVercelEnv === 'production'
    )
  }
}
