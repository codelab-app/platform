import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  CreateAtomGql,
  CreateAtomMutation,
  CreateAtomMutationVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Atom, atomSchema } from '../../atom.model'
import { CreateAtomInput } from './create-atom.input'

@Injectable()
export class CreateAtomService extends MutationUseCase<
  CreateAtomInput,
  Atom,
  CreateAtomMutation,
  CreateAtomMutationVariables
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return CreateAtomGql
  }

  protected extractDataFromResult(result: FetchResult<CreateAtomMutation>) {
    const resultArray = result?.data?.addAtom?.atom

    if (!resultArray || !resultArray[0]) {
      throw new Error('Error while creating atom')
    }

    const atom = resultArray[0]

    return atomSchema.parse({
      ...atom,
      propTypes: {
        // To avoid using dql and calling getInterfaceService, which will
        // flatten down the interface, we can just pass empty arrays as fields and types,
        // because we just created the array, and we're sure there are no fields and types
        ...atom.propTypes,
        fields: [],
        types: [],
      },
    })
  }

  protected mapVariables(
    request: CreateAtomInput,
  ): CreateAtomMutationVariables {
    return {
      input: {
        ...request,
        propTypes: {
          name: request.label + ' Props',
        },
      },
    }
  }
}
