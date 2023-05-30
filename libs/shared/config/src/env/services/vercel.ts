import * as env from 'env-var'

type VercelStage = 'development' | 'preview' | 'production'

export interface IVercelEnvVars {
  nextPublicVercelEnv: VercelStage
  vercel: boolean
  vercelAccessToken: string
  vercelEnv: VercelStage
  vercelProjectId: string
  vercelTeamId: string
}

export class VercelEnvVars implements IVercelEnvVars {
  readonly vercelAccessToken: string

  readonly vercelProjectId: string

  readonly vercelTeamId: string

  readonly vercelEnv: VercelStage

  readonly nextPublicVercelEnv: VercelStage

  readonly vercel: boolean

  constructor() {
    this.vercelAccessToken = env
      .get('VERCEL_ACCESS_TOKEN')
      .required()
      .asString()
    this.vercelProjectId = env.get('VERCEL_PROJECT_ID').required().asString()
    this.vercelTeamId = env.get('VERCEL_TEAM_ID').required().asString()
    this.vercelEnv = env
      .get('VERCEL_ENV')
      .required()
      .asEnum(['development', 'preview', 'production'])
    this.nextPublicVercelEnv = env
      .get('VERCEL_ENV')
      .required()
      .asEnum(['development', 'preview', 'production'])
    this.vercel = env.get('VERCEL').required().asBool()
  }
}
