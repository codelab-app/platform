import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  DeleteAtomGql,
  DeleteAtomMutation,
  DeleteAtomMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom, atomsSchema } from '../../atom.model'
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
    const atoms = atomsSchema.parse(result?.data?.deleteAtom?.atom)

    return atoms[0]
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
