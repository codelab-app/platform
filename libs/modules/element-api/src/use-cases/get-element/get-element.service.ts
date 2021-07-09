import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, QueryUseCase } from '@codelab/backend'
import {
  GetElementGql,
  GetElementQuery,
  GetElementQueryVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { ElementGuardService } from '../../auth'
import { Element } from '../../models'
import { GetElementRequest } from './get-element.request'

type GqlVariablesType = GetElementQueryVariables
type GqlOperationType = GetElementQuery

@Injectable()
export class GetElementService extends QueryUseCase<
  GetElementRequest,
  Element | null,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private elementGuardService: ElementGuardService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return GetElementGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return Element.Schema.parse(result?.data?.getElement) || null
  }

  protected mapVariables({
    input: { elementId },
  }: GetElementRequest): GqlVariablesType {
    return {
      id: elementId,
    }
  }

  protected async validate({
    currentUser,
    input: { elementId },
  }: GetElementRequest): Promise<void> {
    await this.elementGuardService.validate(elementId, currentUser)
  }
}
