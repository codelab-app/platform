import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  UpdateAtomGql,
  UpdateAtomMutation,
  UpdateAtomMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom, atomSchema } from '../../atom.model'
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

  protected extractDataFromResult(result: FetchResult<UpdateAtomMutation>) {
    return atomSchema.parse(result.data?.updateAtom)
  }

  protected mapVariables({
    id,
    data,
  }: UpdateAtomInput): UpdateAtomMutationVariables {
    return {
      input: {
        filter: {
          id: [id],
        },
        set: {
          ...data,
        },
      },
    }
  }
}
