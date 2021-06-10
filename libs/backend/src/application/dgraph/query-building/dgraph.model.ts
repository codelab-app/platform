import { z, ZodArray, ZodString } from 'zod'
import { ZodStringDef, ZodType } from 'zod/lib/types'
import { BaseDgraphFields, baseFieldEnums } from './base-dgraph-fields'
import { DgraphQueryBuilder } from './dgraph-query-builder'
import { DgraphQueryField } from './dgraph-query-field'

// Created separate classes for handling the dgraph representation and queries,
// because I spent quite some time fixing things caused by improper dql queries and their results
// And so that this can be the source of truth when adding new stuff to dgraph, otherwise its
// all over the place across different services and queries.
// Field names are in enums, in order to directly reference them in queries (using the static Metadata property)
// See DgraphInterface model in type-api (and the rest DgraphX models there) for example
export abstract class DgraphModel<TDType extends string = string> {
  [BaseDgraphFields.uid]: string;

  [BaseDgraphFields.DgraphType]: Array<TDType>

  static Metadata: DgraphModelMetadata<string>
}

export class DgraphModelMetadata<TDType extends string> {
  private readonly _queryFields: Array<DgraphQueryField>

  constructor(
    public readonly modelName: TDType,
    public readonly fieldsEnum: Record<string, string>,
  ) {
    this._queryFields = DgraphQueryBuilder.fieldsFromEnum(fieldsEnum)
  }

  /**
   * Returns the fields in a format for dql
   * @param withBaseFields weather to include uid and dgraph.type
   */
  queryFields(withBaseFields = false): Array<DgraphQueryField> {
    return withBaseFields
      ? baseFieldEnums.concat(this._queryFields)
      : this._queryFields
  }
}

//That's a small, but ugly type, which however allows us to type dgraph.type with a concrete string, instead of just 'string'
type DgraphArrayType<T> = T extends string
  ? ZodType<Array<T>, ZodStringDef>
  : ZodArray<ZodString>

/** A zod shape for matching uid and dgraph.type. Pass in a dgraphType, to validate if the dgraph.type matches it */
export const baseFieldsZodShape = <TType extends string>(
  dgraphType: TType | RegExp | undefined,
): {
  [BaseDgraphFields.uid]: ZodString
  [BaseDgraphFields.DgraphType]: DgraphArrayType<TType>
} => {
  return {
    [BaseDgraphFields.uid]: z.string(),
    [BaseDgraphFields.DgraphType]: dgraphType
      ? z.array(z.string().regex(new RegExp(dgraphType)))
      : (z.array(z.string()) as any),
  }
}
