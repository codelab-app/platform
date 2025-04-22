import { TSchema } from '@sinclair/typebox';
export declare const Nullish: <T extends TSchema>(schema: T) => import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[T, import('@sinclair/typebox').TNull]>>;
