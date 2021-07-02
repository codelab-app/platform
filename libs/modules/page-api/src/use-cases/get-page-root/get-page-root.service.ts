import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import {
  FlattenPageElementTreeService,
  PageElementRoot,
} from '@codelab/modules/page-element-api'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
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
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private flattenPageElementTreeService: FlattenPageElementTreeService,
    private pageGuardService: PageGuardService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { pageId } }: GetPageRootRequest,
    txn: Txn,
  ) {
    const queryBuilder = new GetPageRootQueryBuilder().withUidFunc(pageId)
    const query = queryBuilder.build()
    const response = await txn.query(query)
    const result = response.getJson().query

    if (!result || !result.length || !result[0]) {
      return null
    }

    const pageRoot = result[0]

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
      css: rootElement['PageElement.css'],
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
