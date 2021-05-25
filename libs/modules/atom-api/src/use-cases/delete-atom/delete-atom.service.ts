import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  DeleteAtomGql,
  DeleteAtomMutation,
  DeleteAtomMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom } from '../../atom.model'
import { DeleteAtomInput } from './delete-atom.input'

@Injectable()
export class DeleteAtomService extends MutationUseCase<
  DeleteAtomInput,
  Atom,
  DeleteAtomMutation,
  DeleteAtomMutationVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return DeleteAtomGql
  }

  protected extractDataFromResult(result: FetchResult<DeleteAtomMutation>) {
    if (
      !result?.data?.deleteAtom?.atom ||
      !result.data.deleteAtom.atom.length ||
      !result.data.deleteAtom.atom[0]
    ) {
      throw new Error('Error while creating atom')
    }

    return result.data.deleteAtom.atom[0] as Atom
  }

  protected getVariables(
    request: DeleteAtomInput,
  ): DeleteAtomMutationVariables {
    return {
      filter: {
        id: [request.atomId],
      },
    }
  }
}
