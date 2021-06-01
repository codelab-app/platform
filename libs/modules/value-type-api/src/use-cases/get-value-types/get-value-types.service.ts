import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  GetValueTypesGql,
  GetValueTypesQuery,
  GetValueTypesQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { ValueType } from '../../valueType.model'
import { GetValueTypesInput } from './get-value-types.input'

@Injectable()
export class GetValueTypesService
  implements UseCase<GetValueTypesInput, Array<ValueType>>
{
  constructor(private apollo: ApolloClientService) {}

  async execute(request: GetValueTypesInput): Promise<Array<ValueType>> {
    const result = await this.apollo
      .getClient()
      .query<GetValueTypesQuery, GetValueTypesQueryVariables>({
        query: GetValueTypesGql,
        variables: {},
      })

    if (!result?.data?.valueTypes) {
      throw new Error('Error while getting value types')
    }

    return result.data.valueTypes as Array<ValueType>
  }
}
