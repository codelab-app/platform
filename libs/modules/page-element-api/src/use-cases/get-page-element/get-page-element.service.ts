import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  GetPageElementGql,
  GetPageElementQuery,
  GetPageElementQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { PageElementGuardService } from '../../auth'
import { PageElement, pageElementSchema } from '../../models'
import { GetPageElementRequest } from './get-page-element.request'

type GqlVariablesType = GetPageElementQueryVariables
type GqlOperationType = GetPageElementQuery

@Injectable()
export class GetPageElementService extends QueryUseCase<
  GetPageElementRequest,
  PageElement | null,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    apollo: ApolloClientService,
    private pageElementGuardService: PageElementGuardService,
  ) {
    super(apollo)
  }

  protected getGql() {
    return GetPageElementGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    console.log(pageElementSchema.parse(result?.data?.getPageElement))

    return pageElementSchema.parse(result?.data?.getPageElement) || null
  }

  protected mapVariables({
    input: { pageElementId },
  }: GetPageElementRequest): GqlVariablesType {
    return {
      id: pageElementId,
    }
  }

  protected async validate({
    currentUser,
    input: { pageElementId },
  }: GetPageElementRequest): Promise<void> {
    await this.pageElementGuardService.validate(pageElementId, currentUser)
  }
}
