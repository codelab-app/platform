export interface ICircleCIEnvVars {
    ci: boolean;
    circleCi: boolean;
}
export declare class CircleCIEnvVars implements ICircleCIEnvVars {
    get ci(): boolean;
    get circleCi(): boolean;
    private _ci?;
    private _circleCi?;
}
