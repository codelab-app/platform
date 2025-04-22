export interface INeo4jEnvVars {
    password: string;
    uri: string;
    user: string;
}
export declare class Neo4jEnvVars implements INeo4jEnvVars {
    get password(): string;
    get uri(): string;
    get user(): string;
    private _password?;
    private _uri?;
    private _user?;
}
