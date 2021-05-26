import { DGraphService, DgraphUseCase } from '@codelab/backend'
import {
  FlattenPageElementTreeService,
  PageElementRoot,
} from '@codelab/modules/page-element-api'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetPageRootInput } from './get-page-root.input'
import { GetPageRootQueryBuilder } from './get-page-root-query-builder'

@Injectable()
export class GetPageRootService extends DgraphUseCase<
  GetPageRootInput,
  PageElementRoot | null
> {
  constructor(
    dgraph: DGraphService,
    private flattenPageElementTreeService: FlattenPageElementTreeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: GetPageRootInput, txn: Txn) {
    const queryBuilder = new GetPageRootQueryBuilder().withUid(request.pageId)
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
}
