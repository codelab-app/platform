import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  CreateAtomGql,
  CreateAtomMutation,
  CreateAtomMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom, atomsSchema } from '../../atom.model'
import { CreateAtomInput } from './create-atom.input'

@Injectable()
export class CreateAtomService extends MutationUseCase<
  CreateAtomInput,
  Atom,
  CreateAtomMutation,
  CreateAtomMutationVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return CreateAtomGql
  }

  protected extractDataFromResult(result: FetchResult<CreateAtomMutation>) {
    const atoms = atomsSchema.parse(result?.data?.addAtom?.atom)

    return atoms[0]
  }

  protected getVariables(
    request: CreateAtomInput,
  ): CreateAtomMutationVariables {
    return {
      input: {
        type: request.type,
      },
    }
  }
}
