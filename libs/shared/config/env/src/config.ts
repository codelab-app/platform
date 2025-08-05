import type { IAuth0EnvVars } from './services/auth0'
import type { ICircleCIEnvVars } from './services/circleci'
import type { IEndpointEnvVars } from './services/endpoint'
import type { IGoogleAnalyticsEnvVars } from './services/google-analytics'
import type { IHotjarEnvVars } from './services/hotjar'
import type { IIntercomEnvVars } from './services/intercom'
import type { IMailchimpEnvVars } from './services/mailchimp'
import type { INeo4jEnvVars } from './services/neo4j'
import type { INodeEnvVars } from './services/node'
import type { ISupabaseEnvVars } from './services/supabase'

import { Auth0EnvVars } from './services/auth0'
import { CircleCIEnvVars } from './services/circleci'
import { EndpointEnvVars } from './services/endpoint'
import { GoogleAnalyticsEnvVars } from './services/google-analytics'
import { HotjarEnvVars } from './services/hotjar'
import { IntercomEnvVars } from './services/intercom'
import { MailchimpEnvVars } from './services/mailchimp'
import { Neo4jEnvVars } from './services/neo4j'
import { NodeEnvVars } from './services/node'
import { SupabaseEnvVars } from './services/supabase'

export interface IEnvironmentVariables {
  auth0: IAuth0EnvVars
  circleci: ICircleCIEnvVars
  endpoint: IEndpointEnvVars
  googleAnalytics: IGoogleAnalyticsEnvVars
  hotjar: IHotjarEnvVars
  intercom: IIntercomEnvVars
  mailchimp: IMailchimpEnvVars
  neo4j: INeo4jEnvVars
  node: INodeEnvVars
  supabase: ISupabaseEnvVars
}

/* eslint-disable @typescript-eslint/member-ordering */
/**
 * Env works a bit different in Next.js for the browser, they inline the value by replacing all references process.env with a hard coded value
 *
 * https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
 *
 * https://github.com/evanshortiss/env-var/issues/162
 */
class EnvironmentVariables implements IEnvironmentVariables {
  public static getInstance(): EnvironmentVariables {
    if (!EnvironmentVariables.instance) {
      EnvironmentVariables.instance = new EnvironmentVariables()
    }

    return EnvironmentVariables.instance
  }

  // Create endpoint first as auth0 depends on it
  private readonly _endpoint = new EndpointEnvVars()
  private readonly _auth0 = new Auth0EnvVars(this._endpoint)
  private readonly _circleci = new CircleCIEnvVars()
  private readonly _googleAnalytics = new GoogleAnalyticsEnvVars()
  private readonly _hotjar = new HotjarEnvVars()
  private readonly _intercom = new IntercomEnvVars()
  private readonly _mailchimp = new MailchimpEnvVars()
  private readonly _neo4j = new Neo4jEnvVars()
  private readonly _node = new NodeEnvVars()
  private readonly _supabase = new SupabaseEnvVars()

  public get auth0() {
    return this._auth0
  }

  public get circleci() {
    return this._circleci
  }

  public get endpoint() {
    return this._endpoint
  }

  public get googleAnalytics() {
    return this._googleAnalytics
  }

  public get hotjar() {
    return this._hotjar
  }

  public get intercom() {
    return this._intercom
  }

  public get mailchimp() {
    return this._mailchimp
  }

  public get neo4j() {
    return this._neo4j
  }

  public get node() {
    return this._node
  }

  public get supabase() {
    return this._supabase
  }

  private static instance?: EnvironmentVariables
}

export const getEnv = () => EnvironmentVariables.getInstance()
