import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  UpdateAtomGql,
  UpdateAtomMutation,
  UpdateAtomMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom } from '../../atom.model'
import { UpdateAtomInput } from './update-atom.input'

@Injectable()
export class UpdateAtomService extends MutationUseCase<
  UpdateAtomInput,
  Atom,
  UpdateAtomMutation,
  UpdateAtomMutationVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return UpdateAtomGql
  }

  protected extractDataFromResult(
    result: FetchResult<UpdateAtomMutation>,
  ): Atom {
    const atoms = result?.data?.updateAtom?.atom

    if (!atoms || !atoms.length || !atoms[0]) {
      throw new Error('Error while updating atom')
    }

    return atoms[0] as Atom
  }

  protected getVariables({
    atomId,
    updateData,
  }: UpdateAtomInput): UpdateAtomMutationVariables {
    return {
      input: {
        filter: {
          id: [atomId],
        },
        set: {
          type: updateData.type,
        },
      },
    }
  }
}
