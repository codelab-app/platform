import { FetchResult } from '@apollo/client'
import {
  BaseDgraphFields,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphUseCase,
} from '@codelab/backend'
import {
  GetFieldsByTypeGql,
  GetFieldsByTypeQuery,
  GetFieldsByTypeQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { z } from 'zod'
import {
  DgraphField,
  DgraphTypeFields,
  Field,
  Interface,
} from '../../../models'
import { GetFieldsByTypeInput } from './get-fields-by-type.input'

type GqlVariablesType = GetFieldsByTypeQueryVariables
type GqlOperationType = GetFieldsByTypeQuery

export interface ReturnType extends Pick<Field, 'name' | 'id'> {
  interface: Pick<Interface, 'name' | 'id'>
}

@Injectable()
export class GetFieldsByTypeService extends DgraphUseCase<
  GetFieldsByTypeInput,
  Array<ReturnType>
> {
  protected getGql() {
    return GetFieldsByTypeGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return (
      result?.data?.queryField
        ?.filter((f) => !!f?.type?.id)
        .map((f) => ({
          id: (f as any).id as string,
          name: (f as any).name as string,
        })) || []
    )
  }

  protected mapVariables(request: GetFieldsByTypeInput): GqlVariablesType {
    return {
      typeId: request.typeId,
    }
  }

  private schema = z.object({
    [BaseDgraphFields.uid]: z.string(),
    [DgraphField.Fields.Name]: z.string(),
    [DgraphField.Fields.Interface]: z.object({
      [BaseDgraphFields.uid]: z.string(),
      [DgraphTypeFields.name]: z.string(),
    }),
  })

  protected async executeTransaction(
    { typeId }: GetFieldsByTypeInput,
    txn: Txn,
  ): Promise<Array<ReturnType>> {
    const query = new DgraphQueryBuilder()
      .withTypeFunc(DgraphField.Metadata.modelName)
      .withDirective(`@filter(uid_in(${DgraphField.Fields.Type}, ${typeId}))`)
      .withBaseFields()
      .withFields(
        DgraphField.Fields.Name,
        new DgraphQueryField(DgraphField.Fields.Interface)
          .withBaseInnerFields()
          .withInnerFields(DgraphTypeFields.name),
      )
      .build()

    const response = await txn.query(query)
    const result = response.getJson().query
    const parsed = this.schema.array().parse(result)

    return parsed.map((item) => ({
      id: item[BaseDgraphFields.uid],
      name: item[DgraphField.Fields.Name],
      interface: {
        id: item[DgraphField.Fields.Interface][BaseDgraphFields.uid],
        name: item[DgraphField.Fields.Interface][DgraphTypeFields.name],
      },
    }))
  }
}
