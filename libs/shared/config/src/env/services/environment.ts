import type { IEnvironmentVariables } from '../env'

export interface IEnvironmentEnvVars {
  isCi: boolean
  isCircleCi: boolean
  isProduction: boolean
  isTest: boolean
  isVercel: boolean
  isVercelPreview: boolean
}

export class EnvironmentEnvVars implements IEnvironmentEnvVars {
  constructor(private readonly environment: IEnvironmentVariables) {}

  get isProduction() {
    return (
      this.environment.vercel.vercelEnv === 'production' ||
      this.environment.vercel.nextPublicVercelEnv === 'production'
    )
  }

  get isTest() {
    return this.environment.node.nodeEnv === 'test'
  }

  get isCi() {
    return this.environment.circleci.ci
  }

  /**
   * Should be true only for preview environment, not for production
   */
  get isVercelPreview() {
    return (
      this.environment.vercel.vercelEnv === 'preview' ||
      this.environment.vercel.nextPublicVercelEnv === 'preview'
    )
  }

  get isVercel() {
    return (
      this.environment.vercel.vercel ||
      Boolean(this.environment.vercel.nextPublicVercelEnv)
    )
  }

  get isCircleCi() {
    return this.environment.circleci.circleci
  }
}
