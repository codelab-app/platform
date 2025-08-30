/* eslint-disable @typescript-eslint/member-ordering */
import type { IEndpointEnvVars } from './endpoint'

import { env } from '../env'

export interface IAuth0EnvVars {
  audience: string
  domain: string
  baseUrl: string
  clientId: string
  clientSecret: string
  auth0Username: string
  auth0Password: string
  issuerBaseUrl: string
  secret: string
  sessionAutoSave: boolean
  m2mClientId: string
  m2mClientSecret: string
}

/**
 * https://github.com/auth0/nextjs-auth0/issues/383
 */
export class Auth0EnvVars implements IAuth0EnvVars {
  constructor(private readonly endpoint: IEndpointEnvVars) {}

  get audience(): string {
    return new URL('api/v2/', this.issuerBaseUrl).toString()
  }

  get domain(): string {
    return env.get('AUTH0_DOMAIN').required().asString()
  }

  get clientId(): string {
    return env.get('AUTH0_CLIENT_ID').required().asString()
  }

  get clientSecret(): string {
    return env.get('AUTH0_CLIENT_SECRET').required().asString()
  }

  get auth0Username(): string {
    return env.get('AUTH0_E2E_USERNAME').required().asString()
  }

  get auth0Password(): string {
    return env.get('AUTH0_E2E_PASSWORD').required().asString()
  }

  get issuerBaseUrl(): string {
    return new URL('/', `https://${this.domain}`).toString()
  }

  get secret(): string {
    return env.get('AUTH0_SECRET').required().asString()
  }

  get sessionAutoSave(): boolean {
    return env.get('AUTH0_SESSION_AUTO_SAVE').required().asBool()
  }

  get baseUrl() {
    return this.endpoint.webHost
  }

  get m2mClientId(): string {
    return env.get('AUTH0_M2M_CLIENT_ID').required().asString()
  }

  get m2mClientSecret(): string {
    return env.get('AUTH0_M2M_CLIENT_SECRET').required().asString()
  }
}
