import * as env from 'env-var'

export type NodeEnv = 'development' | 'production' | 'test'

export interface INodeEnvVars {
  enableWdyr: boolean
  isCi: boolean
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean
  nodeEnv: NodeEnv
}

export class NodeEnvVars implements INodeEnvVars {
  get enableWdyr() {
    return env.get('NEXT_WEB_ENABLE_WDYR').default(0).asBool()
  }

  get isCi() {
    return env.get('CI').default('false').asBool()
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

  get nodeEnv() {
    return (this._nodeEnv ??= env
      .get('NODE_ENV')
      .default('development')
      .asEnum(['development', 'production', 'test']))
  }

  private _nodeEnv?: NodeEnv
}
