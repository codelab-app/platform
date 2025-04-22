export interface ISupabaseEnvVars {
    key: string;
    url: string;
}
export declare class SupabaseEnvVars implements ISupabaseEnvVars {
    readonly key: string;
    readonly url: string;
    constructor();
}
