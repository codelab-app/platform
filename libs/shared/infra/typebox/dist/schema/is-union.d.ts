import { TObject, TSchema, TUnion } from '@sinclair/typebox';
export declare const IsUnion: (schema: Readonly<TSchema>) => schema is TUnion<Array<TObject>>;
