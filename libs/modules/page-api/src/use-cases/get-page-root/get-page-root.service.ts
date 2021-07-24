import {
  CytoscapeService,
  DgraphProvider,
  DgraphTokens,
  DgraphUseCase,
} from '@codelab/backend'
import {
  ElementAggregate,
  FlattenElementTreeService,
} from '@codelab/modules/element-api'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { PageGuardService } from '../../auth/page-guard/page-guard.service'
import { GetPageRootQuery } from './get-page-root.query'
import { GetPageRootRequest } from './get-page-root.request'

@Injectable()
export class GetPageRootService extends DgraphUseCase<
  GetPageRootRequest,
  ElementAggregate | null,
  void
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private flattenElementTreeService: FlattenElementTreeService,
    private pageGuardService: PageGuardService,
    private cytoscapeService: CytoscapeService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { pageId } }: GetPageRootRequest,
    txn: Txn,
  ) {
    const queryBuilder = new GetPageRootQuery().withUidFunc(pageId)
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
      await this.flattenElementTreeService.execute({
        root: rootElement,
      })

    return new ElementAggregate({
      id: rootElement.uid,
      name: rootElement['Element.name'] as string,
      atom: rootAtom,
      css: rootElement['Element.css'],
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
