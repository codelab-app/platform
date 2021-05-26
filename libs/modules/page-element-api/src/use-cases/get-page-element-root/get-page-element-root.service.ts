import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageElementRoot } from '../../models'
import { FlattenPageElementTreeService } from '../flatten-page-element-tree'
import { GetPageElementRootInput } from './get-page-element-root.input'
import { GetPageElementRootQueryBuilder } from './get-page-element-root-query-builder'

@Injectable()
export class GetPageElementRootService extends DgraphUseCase<
  GetPageElementRootInput,
  PageElementRoot | null
> {
  constructor(
    dgraph: DGraphService,
    private flattenPageElementTreeService: FlattenPageElementTreeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetPageElementRootInput,
    txn: Txn,
  ) {
    const queryBuilder = new GetPageElementRootQueryBuilder().withUid(
      request.pageElementId,
    )

    const schema = queryBuilder.getZodSchema()
    const queryResult = await txn.query(queryBuilder.build())
    const parsedResult = schema.parse(queryResult.data).query

    if (!parsedResult || !parsedResult.length || !parsedResult[0]) {
      return null
    }

    const root = parsedResult[0]

    const { descendants, links, rootAtom } =
      await this.flattenPageElementTreeService.execute({ root })

    return new PageElementRoot({
      id: root.uid,
      name: root['PageElement.name'] as string,
      atom: rootAtom,
      descendants,
      links,
    })
  }
}
