export interface IHotjarEnvVars {
    id: number;
    version: number;
}
export declare class HotjarEnvVars implements IHotjarEnvVars {
    readonly id: number;
    readonly version: number;
    constructor();
}
