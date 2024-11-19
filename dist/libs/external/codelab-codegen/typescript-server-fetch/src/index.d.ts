import type { PluginFunction, PluginValidateFn } from '@graphql-codegen/plugin-helpers';
import type { RawGraphQLRequestPluginConfig } from './config';
import { GraphQLRequestVisitor } from './visitor';
export declare const plugin: PluginFunction<RawGraphQLRequestPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GraphQLRequestVisitor };
