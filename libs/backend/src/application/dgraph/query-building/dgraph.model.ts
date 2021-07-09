import { z, ZodArray, ZodLiteral, ZodString } from 'zod'
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
  constructor(
    public readonly modelName: TDType,
    public readonly fieldsEnum: Record<string, string>,
  ) {}

  /**
   * Returns the fields in a format for dql
   * @param withBaseFields weather to include uid and dgraph.type
   */
  queryFields(withBaseFields = false): Array<DgraphQueryField> {
    // Create the fields dynamically, because otherwise all queries can modify the base model fields
    const fields = DgraphQueryBuilder.fieldsFromEnum(this.fieldsEnum)

    return withBaseFields ? baseFieldEnums.concat(fields) : fields
  }

  /** Creates a new Metadata instance with the modelName of the other and the combined fields of this and the other */
  extend<TOtherType extends string>(other: DgraphModelMetadata<TOtherType>) {
    return new DgraphModelMetadata(other.modelName, {
      ...this.fieldsEnum,
      ...other.fieldsEnum,
    })
  }
}

// That's a small, but ugly type, which however allows us to type dgraph.type with a concrete string, instead of just 'string'
type DgraphArrayType<T> = T extends string
  ? ZodType<Array<T>, ZodStringDef>
  : ZodArray<ZodString>

/** A zod shape for matching uid and dgraph.type. Pass in a dgraphType, to validate if the dgraph.type matches it */
export const baseFieldsZodShape = <TType extends string>(
  dgraphType: TType | undefined,
): {
  [BaseDgraphFields.uid]: ZodString
  [BaseDgraphFields.DgraphType]: DgraphArrayType<TType>
} => {
  return {
    [BaseDgraphFields.uid]: z.string(),
    [BaseDgraphFields.DgraphType]: dgraphType
      ? (z
          .string()
          .array()
          .nonempty()
          .refine((arg) => {
            return !!arg.find((t) => t === dgraphType)
          }) as any as ZodLiteral<TType>)
      : (z.array(z.string()) as any),
  }
}

/**
 * Goes through all of the dgraph.type strings and returns true if any of them matches the
 * provided model name (it's inferred by Metadata.modelName if a model class is provided)
 */
export const instanceOfDgraphModel = <
  TActualModel extends string,
  TExpectedModel extends string,
>(
  object: DgraphModel<TActualModel>,
  model: TExpectedModel | { Metadata: DgraphModelMetadata<TExpectedModel> },
): TActualModel extends TExpectedModel ? true : false => {
  let modelString = ''

  if (typeof model == 'string') {
    modelString = model
  } else {
    modelString = model.Metadata.modelName
  }

  return !!object[BaseDgraphFields.DgraphType].find(
    (t: string) => t === modelString,
  ) as any
}
