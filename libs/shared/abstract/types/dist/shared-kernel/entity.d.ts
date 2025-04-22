import { Static } from '@sinclair/typebox';
export declare const EntitySchema: import('@sinclair/typebox').TObject<{
    id: import('@sinclair/typebox').TString;
}>;
export type IEntity = Static<typeof EntitySchema>;
