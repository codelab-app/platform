export type NodeEnv = 'development' | 'production' | 'test';
export interface INodeEnvVars {
    isCi: boolean;
    isDevelopment: boolean;
    isProduction: boolean;
    isTest: boolean;
    nodeEnv: NodeEnv;
}
export declare class NodeEnvVars implements INodeEnvVars {
    get isCi(): boolean;
    get isDevelopment(): boolean;
    get isProduction(): boolean;
    get isTest(): boolean;
    get nodeEnv(): NodeEnv;
    private _nodeEnv?;
}
