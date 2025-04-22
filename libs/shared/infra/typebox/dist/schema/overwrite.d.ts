import { TObject } from '@sinclair/typebox';
/**
 * Overwrite({ a: string, b: number }, { b: string })
 * ->
 * { a: string, b: string }
 *
 * @param original
 * @param target
 * @returns
 */
export declare const Overwrite: <T extends TObject, U extends TObject>(original: T, target: U) => TObject<Omit<T["properties"], keyof U["properties"]> & U["properties"]>;
