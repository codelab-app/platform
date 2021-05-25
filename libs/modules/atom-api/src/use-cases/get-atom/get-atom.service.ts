import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  GetAtomGql,
  GetAtomQuery,
  GetAtomQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom } from '../../atom.model'
import { GetAtomInput } from './get-atom.input'

@Injectable()
export class GetAtomService extends QueryUseCase<
  GetAtomInput,
  Atom | null,
  GetAtomQuery,
  GetAtomQueryVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return GetAtomGql
  }

  protected extractDataFromResult(
    result: FetchResult<GetAtomQuery>,
  ): Atom | null {
    const atom = result?.data?.atom

    return atom ?? null
  }

  protected getVariables(request: GetAtomInput): GetAtomQueryVariables {
    return {
      id: request.atomId,
    }
  }
}
