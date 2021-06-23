import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { ApolloClientTokens, UseCase } from '@codelab/backend'
import {
  GetValueTypesGql,
  GetValueTypesQuery,
  GetValueTypesQueryVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { ValueType } from '../../valueType.model'
import { GetValueTypesInput } from './get-value-types.input'

@Injectable()
export class GetValueTypesService
  implements UseCase<GetValueTypesInput, Array<ValueType>>
{
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
  ) {}

  async execute(request: GetValueTypesInput): Promise<Array<ValueType>> {
    const result = await this.apolloClient.query<
      GetValueTypesQuery,
      GetValueTypesQueryVariables
    >({
      query: GetValueTypesGql,
      variables: {},
    })

    if (!result?.data?.valueTypes) {
      throw new Error('Error while getting value types')
    }

    return result.data.valueTypes as Array<ValueType>
  }
}
