import * as env from 'env-var'

export type NodeEnv = 'development' | 'production' | 'test'

export interface INodeEnvVars {
  isDevelopment: boolean
  isLocal: boolean
  isProduction: boolean
  isTest: boolean
  nodeEnv: NodeEnv
}

export class NodeEnvVars implements INodeEnvVars {
  private _nodeEnv?: NodeEnv

  get nodeEnv() {
    return (this._nodeEnv ??= process.env['NODE_ENV'])

    // return (this._nodeEnv ??= env
    //   .get('NODE_ENV')
    //   .default('development')
    //   .asEnum(['development', 'production', 'test']))
  }

  get isLocal() {
    const isLocal =
      process.env['NEXT_PUBLIC_PLATFORM_HOST']?.includes('127.0.0.1')

    if (!isLocal) {
      throw new Error('Missing env "NEXT_PUBLIC_PLATFORM_HOST"')
    }

    return isLocal
  }

  get isDevelopment() {
    return this.nodeEnv === 'development'
  }

  get isProduction() {
    return this.nodeEnv === 'production'
  }

  get isTest() {
    return this.nodeEnv === 'test'
  }
}
