import { IEndpointEnvVars } from './endpoint';
export interface IAuth0EnvVars {
    audience: string;
    domain: string;
    baseUrl: string;
    clientId: string;
    clientSecret: string;
    auth0Username: string;
    auth0Password: string;
    issuerBaseUrl: string;
    secret: string;
    sessionAutoSave: boolean;
}
export declare class Auth0EnvVars implements IAuth0EnvVars {
    private readonly endpoint;
    private _audience?;
    private _auth0Domain?;
    private _clientId?;
    private _clientSecret?;
    private _e2eUsername?;
    private _e2ePassword?;
    private _issuerBaseUrl?;
    private _secret?;
    private _sessionAutoSave?;
    constructor(endpoint: IEndpointEnvVars);
    get audience(): string;
    get domain(): string;
    get clientId(): string;
    get clientSecret(): string;
    get auth0Username(): string;
    get auth0Password(): string;
    get issuerBaseUrl(): string;
    get secret(): string;
    get sessionAutoSave(): boolean;
    get baseUrl(): string;
}
