import { FetchResult } from '@apollo/client'
import { MutationUseCase } from '@codelab/backend'
import {
  DeleteAtomGql,
  DeleteAtomMutation,
  DeleteAtomMutationVariables,
} from '@codelab/codegen/dgraph'
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
  protected getGql() {
    return DeleteAtomGql
  }

  protected extractDataFromResult(result: FetchResult<DeleteAtomMutation>) {
    const atoms = atomsSchema.parse(result?.data?.deleteAtom?.atom)

    return atoms[0]
  }

  protected mapVariables(
    request: DeleteAtomInput,
  ): DeleteAtomMutationVariables {
    return {
      filter: {
        id: [request.atomId],
      },
    }
  }
}
