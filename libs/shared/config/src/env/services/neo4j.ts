import * as env from 'env-var'

export interface INeo4jEnvVars {
  password: string
  uri: string
  user: string
}

export class Neo4jEnvVars implements INeo4jEnvVars {
  get password() {
    return (this._password ??= env.get('NEO4J_PASSWORD').required().asString())
  }

  get uri() {
    return (this._uri ??= env.get('NEO4J_URI').required().asUrlString())
  }

  get user() {
    return (this._user ??= env.get('NEO4J_USER').required().asString())
  }

  private _password?: string

  private _uri?: string

  private _user?: string
}
