import { type PluginFunction, type PluginValidateFn } from '@graphql-codegen/plugin-helpers';
import type { RawConfig } from '@graphql-codegen/visitor-plugin-common';
export interface ServerFetchPluginRawConfig extends RawConfig {
    gqlFn: string;
    gqlFnPath: string;
}
export declare const plugin: PluginFunction<ServerFetchPluginRawConfig>;
export declare const validate: PluginValidateFn<any>;
