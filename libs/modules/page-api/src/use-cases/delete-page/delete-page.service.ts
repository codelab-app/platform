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
  DeletePageGql,
  DeletePageMutation,
  DeletePageMutationVariables,
} from '@codelab/codegen/dgraph'
import { GetPropsService } from '@codelab/modules/prop-api'
import { Inject, Injectable } from '@nestjs/common'
import { PageGuardService } from '../../auth'
import { GetPageRootService } from '../get-page-root'
import { DeletePageRequest } from './delete-page.request'

type GqlVariablesType = DeletePageMutationVariables
type GqlOperationType = DeletePageMutation

@Injectable()
export class DeletePageService extends MutationUseCase<
  DeletePageRequest,
  DeleteResponse,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getPageRootService: GetPageRootService,
    private getPropsService: GetPropsService,
    private pageGuardService: PageGuardService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return DeletePageGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return {
      affected: result?.data?.deletePage?.numUids || 0,
    }
  }

  protected async mapVariables({
    input: { pageId },
    currentUser,
  }: DeletePageRequest): Promise<GqlVariablesType> {
    // We need to delete related page elements and props too,
    // otherwise they will become inaccessible garbage

    const pageRoot = await this.getPageRootService.execute({
      input: { pageId },
      currentUser,
    })

    if (!pageRoot) {
      throw new Error('Page not found')
    }

    const pageElementIds = pageRoot.descendants.map((d) => d.id)

    const props = await this.getPropsService.execute({
      byPageElement: { pageElementIds },
    })

    const propIds = props.map((p) => p.id)

    return {
      filter: { id: [pageId] },
      pageElementFilter: { id: pageElementIds },
      propsFilter: { id: propIds },
    }
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: DeletePageRequest): Promise<void> {
    await this.pageGuardService.validate(pageId, currentUser)
  }
}
