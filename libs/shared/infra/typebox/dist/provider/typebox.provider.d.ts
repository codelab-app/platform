import { TKind, TSchema } from '@sinclair/typebox';
interface TypeBoxConfig {
    formatMap: ReadonlyArray<readonly [string, (value: string) => boolean]>;
    schemaKindMap: ReadonlyArray<readonly [TKind, TSchema]>;
}
/**
 * Typebox provider is wrapper to register formats and types to Typebox using the Registry
 *
 * We've removed ajv for formatting
 */
export declare class TypeBoxProvider {
    private config;
    static getInstance(config: TypeBoxConfig): TypeBoxProvider;
    assertHasRegistry(kind: TKind): void;
    tSchema(kind: TKind): TSchema;
    private static instance?;
    private constructor();
    private registerFormat;
    private registerFormats;
    private registerType;
    private registerTypes;
}
export {};
