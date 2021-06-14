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
  DeleteInterfaceAndFieldsGql,
  DeleteInterfaceAndFieldsMutation,
  DeleteInterfaceAndFieldsMutationVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Interface } from '../../../models'
import { GetInterfaceService } from '../get-interface'
import { DeleteInterfaceRequest } from './delete-interface.request'

type GqlVariablesType = DeleteInterfaceAndFieldsMutationVariables
type GqlOperationType = DeleteInterfaceAndFieldsMutation

interface ValidationContext {
  foundInterface: Interface
}

@Injectable()
export class DeleteInterfaceService extends MutationUseCase<
  DeleteInterfaceRequest,
  DeleteResponse,
  GqlOperationType,
  GqlVariablesType,
  ValidationContext
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getInterfaceService: GetInterfaceService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return DeleteInterfaceAndFieldsGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const affected = result?.data?.deleteInterface?.numUids

    if (!affected) {
      throw new Error('Error while deleting interface')
    }

    return {
      affected,
    }
  }

  protected async mapVariables(
    { input: { interfaceId } }: DeleteInterfaceRequest,
    { foundInterface }: ValidationContext,
  ): Promise<GqlVariablesType> {
    return {
      filter: {
        id: [interfaceId],
      },
      fieldFilter: {
        id: foundInterface.fieldCollection?.fields.map((f) => f.id),
      },
    }
  }

  protected async validate({
    input: { interfaceId },
  }: DeleteInterfaceRequest): Promise<ValidationContext> {
    const foundInterface = await this.getInterfaceService.execute({
      input: { interfaceId },
    })

    if (!foundInterface) {
      throw new Error('Interface not found')
    }

    return { foundInterface }
  }
}
