import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import {
  ApolloClientTokens,
  DeleteResponse,
  MutationUseCase,
} from '@codelab/backend'
import {
  DeleteAtomAndInterfaceGql,
  DeleteAtomAndInterfaceMutation,
  DeleteAtomAndInterfaceMutationVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Atom } from '../../atom.model'
import { GetAtomService } from '../get-atom'
import { DeleteAtomInput } from './delete-atom.input'

interface ValidationContext {
  atom: Atom
}

@Injectable()
export class DeleteAtomService extends MutationUseCase<
  DeleteAtomInput,
  DeleteResponse,
  DeleteAtomAndInterfaceMutation,
  DeleteAtomAndInterfaceMutationVariables,
  ValidationContext
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getAtomService: GetAtomService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return DeleteAtomAndInterfaceGql
  }

  protected extractDataFromResult(
    result: FetchResult<DeleteAtomAndInterfaceMutation>,
  ) {
    // returning the atom caused an error, because we delete the propTypes, so they are null
    // removing it, since we never use the deleted atom
    const affected =
      (result?.data?.deleteAtom?.numUids || 0) +
      (result?.data?.deleteInterface?.numUids || 0)

    return {
      affected,
    }
  }

  protected mapVariables(
    request: DeleteAtomInput,
    { atom }: ValidationContext,
  ): DeleteAtomAndInterfaceMutationVariables {
    return {
      filter: {
        id: [request.atomId],
      },
      interfaceFilter: {
        id: [atom.propTypes.id],
      },
    }
  }

  protected async validate({
    atomId,
  }: DeleteAtomInput): Promise<ValidationContext> {
    const atom = await this.getAtomService.execute({ atomId })

    if (!atom) {
      throw new Error("Can't delete, atom not found")
    }

    return { atom }
  }
}
