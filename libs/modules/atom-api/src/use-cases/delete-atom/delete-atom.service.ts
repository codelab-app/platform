import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import {
  ApolloClientTokens,
  BaseDgraphFields,
  DeleteResponse,
  MutationUseCase,
} from '@codelab/backend'
import {
  DeleteAtomAndInterfaceGql,
  DeleteAtomAndInterfaceMutation,
  DeleteAtomAndInterfaceMutationVariables,
} from '@codelab/codegen/dgraph'
import {
  DgraphInterface,
  GetDgraphTypeService,
  InterfaceDgraphFields,
} from '@codelab/modules/type-api'
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
    private getDgraphTypeService: GetDgraphTypeService,
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

  protected async mapVariables(
    request: DeleteAtomInput,
    { atom }: ValidationContext,
  ): Promise<DeleteAtomAndInterfaceMutationVariables> {
    // Delete the interface fields too. We can just call DeleteTypeService, but what if
    // one of the calls - either DeleteType.execute, or DeleteAtom.execute fails?
    const type = (await this.getDgraphTypeService.execute({
      typeId: atom.propTypes.id,
    })) as DgraphInterface

    const fieldIds =
      type && type[InterfaceDgraphFields.Fields]
        ? type[InterfaceDgraphFields.Fields]?.map(
            (f) => f[BaseDgraphFields.uid],
          ) || []
        : []

    return {
      filter: {
        id: [request.atomId],
      },
      interfaceFilter: {
        id: [atom.propTypes.id],
      },
      fieldFilter: {
        id: fieldIds,
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
