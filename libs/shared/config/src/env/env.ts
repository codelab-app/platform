import type { IAuth0EnvVars } from './services/auth0'
import { Auth0EnvVars } from './services/auth0'
import type { ICircleCIEnvVars } from './services/circleci'
import { CircleCIEnvVars } from './services/circleci'
import type { IEndpointEnvVars } from './services/endpoint'
import { EndpointEnvVars } from './services/endpoint'
import type { IGoogleAnalyticsEnvVars } from './services/google-analytics'
import { GoogleAnalyticsEnvVars } from './services/google-analytics'
import type { IHotjarEnvVars } from './services/hotjar'
import { HotjarEnvVars } from './services/hotjar'
import type { IIntercomEnvVars } from './services/intercom'
import { IntercomEnvVars } from './services/intercom'
import type { IMailchimpEnvVars } from './services/mailchimp'
import { MailchimpEnvVars } from './services/mailchimp'
import type { INeo4jEnvVars } from './services/neo4j'
import { Neo4jEnvVars } from './services/neo4j'
import type { INodeEnvVars } from './services/node'
import { NodeEnvVars } from './services/node'
import type { ISupabaseEnvVars } from './services/supabase'
import { SupabaseEnvVars } from './services/supabase'
import type { IVercelEnvVars } from './services/vercel'
import { VercelEnvVars } from './services/vercel'
import { type IVercelKVEnvVars, VercelKVEnvVars } from './services/vercel-kv'

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
  vercel: IVercelEnvVars
  vercelKV: IVercelKVEnvVars
}

/**
 * Env works a bit different in Next.js for the browser, they inline the value by replacing all references process.env with a hard coded value
 *
 * https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
 *
 * https://github.com/evanshortiss/env-var/issues/162
 */
class EnvironmentVariables implements IEnvironmentVariables {
  private _mailchimp?: IMailchimpEnvVars

  private _auth0?: IAuth0EnvVars

  private _circleci?: ICircleCIEnvVars

  private _googleAnalytics?: IGoogleAnalyticsEnvVars

  private _hotjar?: IHotjarEnvVars

  private _intercom?: IIntercomEnvVars

  private _neo4j?: INeo4jEnvVars

  private _supabase?: ISupabaseEnvVars

  private _vercel?: IVercelEnvVars

  private _node?: INodeEnvVars

  private _endpoint?: IEndpointEnvVars

  private _vercelKV?: IVercelKVEnvVars

  private static instance?: EnvironmentVariables

  public static getInstance(): EnvironmentVariables {
    if (!EnvironmentVariables.instance) {
      EnvironmentVariables.instance = new EnvironmentVariables()
    }

    return EnvironmentVariables.instance
  }

  get vercelKV() {
    return (this._vercelKV ??= new VercelKVEnvVars())
  }

  public get mailchimp() {
    return (this._mailchimp ??= new MailchimpEnvVars())
  }

  public get auth0() {
    return (this._auth0 ??= new Auth0EnvVars(this.endpoint))
  }

  public get circleci() {
    return (this._circleci ??= new CircleCIEnvVars())
  }

  public get googleAnalytics() {
    return (this._googleAnalytics ??= new GoogleAnalyticsEnvVars())
  }

  public get hotjar() {
    return (this._hotjar ??= new HotjarEnvVars())
  }

  public get intercom() {
    return (this._intercom ??= new IntercomEnvVars())
  }

  public get neo4j() {
    return (this._neo4j ??= new Neo4jEnvVars())
  }

  public get supabase() {
    return (this._supabase ??= new SupabaseEnvVars())
  }

  public get vercel() {
    return (this._vercel ??= new VercelEnvVars())
  }

  public get node() {
    return (this._node ??= new NodeEnvVars())
  }

  public get endpoint() {
    return (this._endpoint ??= new EndpointEnvVars())
  }
}

export const getEnv = () => EnvironmentVariables.getInstance()
