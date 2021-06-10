import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdateInterfaceGql,
  UpdateInterfaceMutation,
  UpdateInterfaceMutationVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Interface } from '../../../models'
import { GetInterfaceService } from '../get-interface'
import { UpdateInterfaceRequest } from './update-interface.request'

type GqlVariablesType = UpdateInterfaceMutationVariables
type GqlOperationType = UpdateInterfaceMutation

@Injectable()
export class UpdateInterfaceService extends MutationUseCase<
  UpdateInterfaceRequest,
  Interface,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getInterfaceService: GetInterfaceService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return UpdateInterfaceGql
  }

  protected extractDataFromResult(
    result: FetchResult<GqlOperationType>,
    _: unknown,
    { input: { interfaceId } }: UpdateInterfaceRequest,
  ) {
    return this.getInterfaceService.execute({
      input: { interfaceId },
    }) as Promise<Interface>
  }

  protected mapVariables({
    input: {
      interfaceId,
      updateData: { name },
    },
  }: UpdateInterfaceRequest): GqlVariablesType {
    return {
      input: {
        filter: {
          id: [interfaceId],
        },
        set: { name },
      },
    }
  }
}
