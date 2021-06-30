import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdateTypeGql,
  UpdateTypeMutation,
  UpdateTypeMutationVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Type } from '../../../models'
import { GetTypeService } from '../get-type'
import { UpdateTypeInput } from './update-type.input'

type GqlVariablesType = UpdateTypeMutationVariables
type GqlOperationType = UpdateTypeMutation

@Injectable()
export class UpdateTypeService extends MutationUseCase<
  UpdateTypeInput,
  Type,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getTypeService: GetTypeService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return UpdateTypeGql
  }

  protected async extractDataFromResult({
    data,
  }: FetchResult<GqlOperationType>) {
    const dataArray = data?.updateType?.type
    const item = (dataArray || [])[0]

    if (!dataArray || !item) {
      throw new Error('Error while updating type')
    }

    const result = await this.getTypeService.execute({
      input: { typeId: item.id },
    })

    if (!result) {
      throw new Error('Error while updating type')
    }

    return result
  }

  protected mapVariables({
    typeId,
    updateData: { name },
  }: UpdateTypeInput): GqlVariablesType {
    return {
      input: {
        filter: { id: [typeId] },
        set: { name },
      },
    }
  }
}
