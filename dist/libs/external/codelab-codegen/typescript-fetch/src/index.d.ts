import type { PluginFunction, PluginValidateFn } from '@graphql-codegen/plugin-helpers';
import type { RawGraphQLRequestPluginConfig } from './config.js';
import { GraphQLRequestVisitor } from './visitor.js';
export declare const plugin: PluginFunction<RawGraphQLRequestPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GraphQLRequestVisitor };
