import { Static, TKind } from '@sinclair/typebox';
export declare const TRef: TKind;
export declare const RefSchema: import('@sinclair/typebox').TObject<{
    id: import('@sinclair/typebox').TString;
}>;
export type IRef = Static<typeof RefSchema>;
/**
 * For export data we want to include additional fields for readability purposes
 */
export declare const DiscriminatedRef: <T extends string>(typename: T) => import('@sinclair/typebox').TObject<{
    __typename: import('@sinclair/typebox').TLiteral<`${T}`>;
    name: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TString>;
    id: import('@sinclair/typebox').TString;
}>;
