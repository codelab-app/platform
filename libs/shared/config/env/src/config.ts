import type { IAuth0EnvVars } from './services/auth0'
import type { ICircleCIEnvVars } from './services/circleci'
import type { IDigitalOceanEnvVars } from './services/digitalocean'
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
import { DigitalOceanEnvVars } from './services/digitalocean'
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
  digitalocean: IDigitalOceanEnvVars
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
  public readonly endpoint = new EndpointEnvVars()
  public readonly auth0 = new Auth0EnvVars(this.endpoint)
  public readonly circleci = new CircleCIEnvVars()
  public readonly digitalocean = new DigitalOceanEnvVars()
  public readonly googleAnalytics = new GoogleAnalyticsEnvVars()
  public readonly hotjar = new HotjarEnvVars()
  public readonly intercom = new IntercomEnvVars()
  public readonly mailchimp = new MailchimpEnvVars()
  public readonly neo4j = new Neo4jEnvVars()
  public readonly node = new NodeEnvVars()
  public readonly supabase = new SupabaseEnvVars()

  private static instance?: EnvironmentVariables
}

export const getEnv = () => EnvironmentVariables.getInstance()
