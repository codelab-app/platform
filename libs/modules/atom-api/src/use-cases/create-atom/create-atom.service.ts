import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase, UseCase } from '@codelab/backend'
import {
  CreateAtomGql,
  CreateAtomMutation,
  CreateAtomMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom } from '../../atom.model'
import { CreateAtomRequest } from './create-atom.request'

@Injectable()
export class CreateAtomService extends MutationUseCase<
  CreateAtomRequest,
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
    const atoms = result?.data?.addAtom?.atom
    if (
      !atoms ||
      !atoms.length ||
      !atoms[0]
    ) {
      throw new Error('Error while creating atom')
    }

    return atoms[0] as Atom
  }

  protected getVariables(
    request: CreateAtomRequest,
  ): CreateAtomMutationVariables {
    return {
      input: {
        type: request.input.type,
      },
    }
  }
}
