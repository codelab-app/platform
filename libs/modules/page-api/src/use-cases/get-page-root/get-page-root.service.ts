import { DGraphService, DgraphUseCase } from '@codelab/backend'
import {
  FlattenPageElementTreeService,
  PageElementRoot,
} from '@codelab/modules/page-element-api'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
//shortened import causes circular reference and some weird shit happen
import { PageGuardService } from '../../auth/page-guard/page-guard.service'
import { GetPageRootRequest } from './get-page-root.request'
import { GetPageRootQueryBuilder } from './get-page-root-query-builder'

@Injectable()
export class GetPageRootService extends DgraphUseCase<
  GetPageRootRequest,
  PageElementRoot | null,
  void
> {
  constructor(
    dgraph: DGraphService,
    private flattenPageElementTreeService: FlattenPageElementTreeService,
    private pageGuardService: PageGuardService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    { input: { pageId } }: GetPageRootRequest,
    txn: Txn,
  ) {
    const queryBuilder = new GetPageRootQueryBuilder().withUid(pageId)
    const schema = queryBuilder.getZodSchema()
    const queryResult = await txn.query(queryBuilder.build())
    const parsedResult = schema.parse(queryResult.data).query

    if (!parsedResult || !parsedResult.length || !parsedResult[0]) {
      return null
    }

    const pageRoot = parsedResult[0]

    if (!pageRoot) {
      return null
    }

    const rootElement = pageRoot['Page.rootElement']

    if (!rootElement) {
      return null
    }

    const { descendants, links, rootAtom } =
      await this.flattenPageElementTreeService.execute({
        root: rootElement,
      })

    return new PageElementRoot({
      id: rootElement.uid,
      name: rootElement['PageElement.name'] as string,
      atom: rootAtom,
      descendants,
      links,
    })
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: GetPageRootRequest): Promise<void> {
    await this.pageGuardService.validate(pageId, currentUser)
  }
}
