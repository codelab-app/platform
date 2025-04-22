interface IAdminEndpoints {
    /**
     * export all data into a json file
     */
    export: string;
    /**
     * import all from a json file
     */
    import: string;
    /**
     * delete all data from database including user infos
     */
    resetDatabase: string;
    /**
     * seed data on login (used for development only)
     */
    setupDev: string;
}
interface IAppEndpoints {
    export: string;
    import: string;
}
interface IComponentEndpoints {
    export: string;
    import: string;
}
interface IUserEndpoints {
    /**
     * save user data on login (used for development only)
     */
    save: string;
}
export interface IEndpointEnvVars {
    /**
     * admin endpoints
     */
    admin: IAdminEndpoints;
    /**
     * The actual backend GraphQL endpoint
     */
    apiGraphqlUrl: string;
    apiHost: string;
    apiUrl: string;
    /**
     * app endpoints
     */
    app: IAppEndpoints;
    /**
     * `api/v1`
     */
    baseApiPath: string;
    /**
     * Used to secure pages on production
     */
    canActivateUrl: string;
    /**
     * component endpoints
     */
    component: IComponentEndpoints;
    isLocal: boolean;
    regenerate: string;
    /**
     * user endpoints
     */
    user: IUserEndpoints;
    /**
     * This is the Next.js middleware that forwards to the backend graphql endpoint
     */
    webGraphqlUrl: string;
    webHost: string;
}
export declare class EndpointEnvVars implements IEndpointEnvVars {
    get admin(): IAdminEndpoints;
    /**
     * http://127.0.0.1:4000/api/v1/graphql
     */
    get apiGraphqlUrl(): string;
    /**
     * http://127.0.0.1:4000
     */
    get apiHost(): string;
    get apiUrl(): string;
    get app(): IAppEndpoints;
    get baseApiPath(): string;
    /**
     * URL is protocol + origin
     */
    get canActivateUrl(): string;
    get component(): IComponentEndpoints;
    get isLocal(): boolean;
    get regenerate(): string;
    get user(): IUserEndpoints;
    /**
     * URL is protocol + origin
     *
     * This uses the Next.js proxy middleware
     */
    get webGraphqlUrl(): string;
    /**
     * This is used before module is initialized, so we must access process.env
     */
    get webHost(): string;
    private _apiHost?;
    private _webHost?;
}
export {};
