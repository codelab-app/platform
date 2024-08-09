import * as env from 'env-var'

/**
 * https://github.com/evanshortiss/env-var/issues/162
 */
const { get } = env.from({
  NEXT_PUBLIC_API_HOSTNAME: process.env['NEXT_PUBLIC_API_HOSTNAME'],
  NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'],
  NEXT_PUBLIC_BASE_API_PATH: process.env['NEXT_PUBLIC_BASE_API_PATH'],
  NEXT_PUBLIC_WEB_HOST: process.env['NEXT_PUBLIC_WEB_HOST'],
})

interface IAdminEndpoints {
  /**
   * export all data into a json file
   */
  export: string
  /**
   * import all from a json file
   */
  import: string
  /**
   * delete all data from database including user infos
   */
  resetDatabase: string
  /**
   * seed data on login (used for development only)
   */
  setupDev: string
}

interface IAppEndpoints {
  export: string
  import: string
}

interface IComponentEndpoints {
  export: string
  import: string
}

interface IUserEndpoints {
  /**
   * save user data on login (used for development only)
   */
  save: string
}

export interface IEndpointEnvVars {
  /**
   * admin endpoints
   */
  admin: IAdminEndpoints
  /**
   * The actual backend GraphQL endpoint
   */
  apiGraphqlUrl: string
  apiHost: string
  /**
   * app endpoints
   */
  app: IAppEndpoints

  /**
   * `api/v1`
   */
  baseApiPath: string
  /**
   * Used to secure pages on production
   */
  canActivateUrl: string
  /**
   * component endpoints
   */
  component: IComponentEndpoints
  isLocal: boolean

  regenerate: string

  /**
   * user endpoints
   */
  user: IUserEndpoints

  /**
   * This is the Next.js middleware that forwards to the backend graphql endpoint
   */
  webGraphqlUrl: string
  webHost: string
}

export class EndpointEnvVars implements IEndpointEnvVars {
  get admin(): IAdminEndpoints {
    const exportEndpoint = `${this.baseApiPath}/admin/export`
    const importEndpoint = `${this.baseApiPath}/admin/import`
    const resetDatabaseEndpoint = `${this.baseApiPath}/admin/reset-database`
    const setupDev = `${this.baseApiPath}/admin/setup-dev`

    return {
      export: new URL(exportEndpoint, this.apiUrl).toString(),
      import: new URL(importEndpoint, this.apiUrl).toString(),
      resetDatabase: new URL(resetDatabaseEndpoint, this.apiUrl).toString(),
      setupDev: new URL(setupDev, this.apiUrl).toString(),
    }
  }

  /**
   * http://127.0.0.1:4000/api/graphql
   */
  get apiGraphqlUrl(): string {
    return new URL(`${this.baseApiPath}/graphql`, this.apiHost).toString()
  }

  /**
   * http://127.0.0.1:4000
   */
  get apiHost(): string {
    if (this._apiHost) {
      return this._apiHost
    }

    const port = get('NEXT_PUBLIC_API_PORT').required().asPortNumber()
    const url = get('NEXT_PUBLIC_API_HOSTNAME').required().asUrlObject()

    return (this._apiHost = new URL(`${url.origin}:${port}`).toString())
  }

  get apiUrl() {
    return new URL(this.baseApiPath, this.webHost).toString()
  }

  get app(): IAppEndpoints {
    const exportEndpoint = `${this.baseApiPath}/app/export`
    const importEndpoint = `${this.baseApiPath}/app/import`

    return {
      export: new URL(exportEndpoint, this.webHost).toString(),
      import: new URL(importEndpoint, this.webHost).toString(),
    }
  }

  get baseApiPath() {
    return get('NEXT_PUBLIC_BASE_API_PATH').required().asString()
  }

  /**
   * URL is protocol + origin
   */
  get canActivateUrl() {
    return new URL(`${this.baseApiPath}/can-activate`, this.webHost).toString()
  }

  get component(): IComponentEndpoints {
    const exportEndpoint = `${this.baseApiPath}/component/export`
    const importEndpoint = `${this.baseApiPath}/component/import`

    return {
      export: new URL(exportEndpoint, this.webHost).toString(),
      import: new URL(importEndpoint, this.webHost).toString(),
    }
  }

  get isLocal() {
    return this.webGraphqlUrl.includes('127.0.0.1')
  }

  get regenerate(): string {
    return new URL(`${this.baseApiPath}/regenerate`, this.apiUrl).toString()
  }

  get user(): IUserEndpoints {
    const saveEndpoint = `${this.baseApiPath}/user/save`

    return {
      save: new URL(saveEndpoint, this.apiUrl).toString(),
    }
  }

  /**
   * URL is protocol + origin
   *
   * This uses the Next.js proxy middleware
   */
  get webGraphqlUrl() {
    return new URL(`${this.baseApiPath}/graphql`, this.webHost).toString()
  }

  /**
   * This is used before module is initialized, so we must access process.env
   */
  get webHost(): string {
    return (this._webHost ??= get('NEXT_PUBLIC_WEB_HOST').required().asString())
  }

  private _apiHost?: string

  private _webHost?: string
}
