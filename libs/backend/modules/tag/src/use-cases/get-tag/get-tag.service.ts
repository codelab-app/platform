import { DgraphUseCase } from '@codelab/backend/application'
import { ITag, TagSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagInput } from './get-tag.input'
import { getTagQuery, mapDgraphTag } from './get-tag.query'

@Injectable()
export class GetTagService extends DgraphUseCase<GetTagInput, ITag | null> {
  protected schema = TagSchema.nullable().optional()

  protected async executeTransaction(request: GetTagInput, txn: Txn) {
    const {
      where: { id, name },
    } = request

    if (id) {
      const tag = await this.dgraph.getOneNamed<ITag>(
        txn,
        GetTagService.createWhereIdQuery(id),
        'query',
      )

      return mapDgraphTag(tag)
    }

    if (name) {
      const tag = await this.dgraph.getOneNamed<ITag>(
        txn,
        GetTagService.createWhereNameQuery(name),
        'query',
      )

      return mapDgraphTag(tag)
    }

    throw new Error('Invalid GetTagInput')
  }

  private static createWhereIdQuery(id: string) {
    return getTagQuery(`@filter(uid(${id}))`)
  }

  private static createWhereNameQuery(name: string) {
    return getTagQuery(`@filter(eq(name, "${name}"))`)
  }
}
