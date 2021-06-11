import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdateAtomGql,
  UpdateAtomMutation,
  UpdateAtomMutationVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Atom } from '../../atom.model'
import { UpdateAtomInput } from './update-atom.input'

@Injectable()
export class UpdateAtomService extends MutationUseCase<
  UpdateAtomInput,
  Atom,
  UpdateAtomMutation,
  UpdateAtomMutationVariables
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return UpdateAtomGql
  }

  protected extractDataFromResult(result: FetchResult<UpdateAtomMutation>) {
    // return atomSchema.parse(result.data?.updateAtom)
    const atoms = result.data?.updateAtom?.atom

    if (!atoms || !atoms.length || !atoms[0]) {
      throw new Error('Atom not found')
    }

    return atoms[0] as unknown as Atom
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
