import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
// shortened import causes circular reference and some weird shit happen
import { PageElementGuardService } from '../../auth/page-element-guard/page-element-guard.service'
import { PageElementRoot } from '../../models'
import { FlattenPageElementTreeService } from '../flatten-page-element-tree'
import { GetPageElementRootRequest } from './get-page-element-root.request'
import { GetPageElementRootQueryBuilder } from './get-page-element-root-query-builder'

@Injectable()
export class GetPageElementRootService extends DgraphUseCase<
  GetPageElementRootRequest,
  PageElementRoot | null,
  void
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private flattenPageElementTreeService: FlattenPageElementTreeService,
    private pageElementGuardService: PageElementGuardService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { pageElementId } }: GetPageElementRootRequest,
    txn: Txn,
  ) {
    const queryBuilder = new GetPageElementRootQueryBuilder().withUid(
      pageElementId,
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

  protected async validate({
    currentUser,
    input: { pageElementId },
  }: GetPageElementRootRequest): Promise<void> {
    await this.pageElementGuardService.validate(pageElementId, currentUser)
  }
}
