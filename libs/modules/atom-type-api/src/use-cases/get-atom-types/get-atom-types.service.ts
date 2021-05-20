import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  GetAtomTypesGql,
  GetAtomTypesQuery,
  GetAtomTypesQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { AtomType } from '../../atomType.model'
import { GetAtomTypesInput } from './get-atom-types.input'

@Injectable()
export class GetAtomTypesService
  implements UseCase<GetAtomTypesInput | undefined, Array<AtomType>>
{
  constructor(private apollo: ApolloClientService) {}

  async execute(
    request: GetAtomTypesInput | undefined,
  ): Promise<Array<AtomType>> {
    const result = await this.apollo
      .getClient()
      .query<GetAtomTypesQuery, GetAtomTypesQueryVariables>({
        query: GetAtomTypesGql,
        variables: {},
      })

    if (!result?.data?.atomTypes) {
      throw new Error('Error while getting atom types')
    }

    return result.data.atomTypes as Array<AtomType>
  }
}
