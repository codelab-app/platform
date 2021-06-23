import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  GetPageOwnerGql,
  GetPageOwnerQuery,
  GetPageOwnerQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { GetPageOwnerInput } from './get-page-owner.input'
import { GetPageOwnerResponse } from './get-page-owner.response'

type GqlVariablesType = GetPageOwnerQueryVariables
type GqlOperationType = GetPageOwnerQuery

@Injectable()
export class GetPageOwnerService extends QueryUseCase<
  GetPageOwnerInput,
  GetPageOwnerResponse,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return GetPageOwnerGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return {
      ownerId: result?.data?.getPage?.app?.ownerId,
    }
  }

  protected mapVariables(request: GetPageOwnerInput): GqlVariablesType {
    return {
      pageId: request.pageId,
    }
  }
}
