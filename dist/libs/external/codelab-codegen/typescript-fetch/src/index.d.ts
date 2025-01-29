import type { RawConfig } from '@graphql-codegen/visitor-plugin-common';
import { type PluginFunction, type PluginValidateFn } from '@graphql-codegen/plugin-helpers';
export interface FetchPluginRawConfig extends RawConfig {
    gqlFn: string;
    gqlFnPath: string;
}
export declare const plugin: PluginFunction<FetchPluginRawConfig>;
export declare const validate: PluginValidateFn<any>;
