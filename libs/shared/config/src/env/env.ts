import * as env from 'env-var'
import type { IAuth0EnvVars } from './services/auth0'
import { Auth0EnvVars } from './services/auth0'
import type { ICircleCIEnvVars } from './services/circleci'
import { CircleCIEnvVars } from './services/circleci'
import type { IEnvironmentEnvVars } from './services/environment'
import { EnvironmentEnvVars } from './services/environment'
import type { IGoogleAnalyticsEnvVars } from './services/google-analytics'
import { GoogleAnalyticsEnvVars } from './services/google-analytics'
import type { IGraphQLEnvVars } from './services/graphql'
import { GraphQLEnvVars } from './services/graphql'
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

export interface IEnvironmentVariables {
  auth0: IAuth0EnvVars
  circleci: ICircleCIEnvVars
  environment: IEnvironmentEnvVars
  googleAnalytics: IGoogleAnalyticsEnvVars
  graphql: IGraphQLEnvVars
  hotjar: IHotjarEnvVars
  intercom: IIntercomEnvVars
  mailchimp: IMailchimpEnvVars
  neo4j: INeo4jEnvVars
  node: INodeEnvVars
  supabase: ISupabaseEnvVars
  vercel: IVercelEnvVars
}

class EnvironmentVariables implements IEnvironmentVariables {
  public mailchimp: IMailchimpEnvVars

  public auth0: IAuth0EnvVars

  public circleci: ICircleCIEnvVars

  public googleAnalytics: IGoogleAnalyticsEnvVars

  public hotjar: IHotjarEnvVars

  public intercom: IIntercomEnvVars

  public neo4j: INeo4jEnvVars

  public supabase: ISupabaseEnvVars

  public vercel: IVercelEnvVars

  public environment: IEnvironmentEnvVars

  public graphql: IGraphQLEnvVars

  /**
   * Put these here for now
   */
  public node: INodeEnvVars

  constructor() {
    this.auth0 = new Auth0EnvVars(this)
    this.circleci = new CircleCIEnvVars()
    this.googleAnalytics = new GoogleAnalyticsEnvVars()
    this.hotjar = new HotjarEnvVars()
    this.intercom = new IntercomEnvVars()
    this.mailchimp = new MailchimpEnvVars()
    this.neo4j = new Neo4jEnvVars()
    this.supabase = new SupabaseEnvVars()
    this.vercel = new VercelEnvVars()
    this.node = new NodeEnvVars()
    this.environment = new EnvironmentEnvVars(this)
    this.graphql = new GraphQLEnvVars(this)
  }
}

export const Env = new EnvironmentVariables()
