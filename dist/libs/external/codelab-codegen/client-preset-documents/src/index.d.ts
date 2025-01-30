import type { RawConfig } from '@graphql-codegen/visitor-plugin-common';
import { type PluginFunction, type PluginValidateFn } from '@graphql-codegen/plugin-helpers';
export interface ClientPresetPluginRawConfig extends RawConfig {
}
export declare const plugin: PluginFunction<ClientPresetPluginRawConfig>;
export declare const validate: PluginValidateFn<any>;
