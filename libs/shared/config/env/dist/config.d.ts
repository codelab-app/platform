import { IAuth0EnvVars, Auth0EnvVars } from './services/auth0';
import { ICircleCIEnvVars, CircleCIEnvVars } from './services/circleci';
import { IEndpointEnvVars, EndpointEnvVars } from './services/endpoint';
import { IGoogleAnalyticsEnvVars, GoogleAnalyticsEnvVars } from './services/google-analytics';
import { IHotjarEnvVars, HotjarEnvVars } from './services/hotjar';
import { IIntercomEnvVars, IntercomEnvVars } from './services/intercom';
import { IMailchimpEnvVars } from './services/mailchimp';
import { INeo4jEnvVars, Neo4jEnvVars } from './services/neo4j';
import { INodeEnvVars, NodeEnvVars } from './services/node';
import { ISupabaseEnvVars, SupabaseEnvVars } from './services/supabase';
export interface IEnvironmentVariables {
    auth0: IAuth0EnvVars;
    circleci: ICircleCIEnvVars;
    endpoint: IEndpointEnvVars;
    googleAnalytics: IGoogleAnalyticsEnvVars;
    hotjar: IHotjarEnvVars;
    intercom: IIntercomEnvVars;
    mailchimp: IMailchimpEnvVars;
    neo4j: INeo4jEnvVars;
    node: INodeEnvVars;
    supabase: ISupabaseEnvVars;
}
/**
 * Env works a bit different in Next.js for the browser, they inline the value by replacing all references process.env with a hard coded value
 *
 * https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
 *
 * https://github.com/evanshortiss/env-var/issues/162
 */
declare class EnvironmentVariables implements IEnvironmentVariables {
    static getInstance(): EnvironmentVariables;
    get auth0(): IAuth0EnvVars | Auth0EnvVars;
    get circleci(): ICircleCIEnvVars | CircleCIEnvVars;
    get endpoint(): IEndpointEnvVars | EndpointEnvVars;
    get googleAnalytics(): GoogleAnalyticsEnvVars;
    get hotjar(): HotjarEnvVars;
    get intercom(): IntercomEnvVars;
    get mailchimp(): IMailchimpEnvVars;
    get neo4j(): INeo4jEnvVars | Neo4jEnvVars;
    get node(): INodeEnvVars | NodeEnvVars;
    get supabase(): SupabaseEnvVars;
    private static instance?;
    private _auth0?;
    private _circleci?;
    private _endpoint?;
    private _googleAnalytics?;
    private _hotjar?;
    private _intercom?;
    private _mailchimp?;
    private _neo4j?;
    private _node?;
    private _supabase?;
}
export declare const getEnv: () => EnvironmentVariables;
export {};
