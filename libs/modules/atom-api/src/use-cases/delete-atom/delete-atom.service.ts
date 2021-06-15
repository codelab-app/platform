import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  DeleteAtomAndInterfaceGql,
  DeleteAtomAndInterfaceMutation,
  DeleteAtomAndInterfaceMutationVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Atom, atomsSchema } from '../../atom.model'
import { GetAtomService } from '../get-atom'
import { DeleteAtomInput } from './delete-atom.input'

interface ValidationContext {
  atom: Atom
}

@Injectable()
export class DeleteAtomService extends MutationUseCase<
  DeleteAtomInput,
  Atom,
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
    const atoms = atomsSchema.parse(result?.data?.deleteAtom?.atom)

    return atoms[0]
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
