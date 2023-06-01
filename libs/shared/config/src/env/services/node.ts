import * as env from 'env-var'

export type NodeEnv = 'development' | 'production' | 'test'

export interface INodeEnvVars {
  isDevelopment: boolean
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
