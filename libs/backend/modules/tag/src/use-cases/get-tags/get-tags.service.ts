import { DgraphUseCase } from '@codelab/backend/application'
import { ITag, TagSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getTagQuery, mapDgraphTag } from '../get-tag/get-tag.query'
import { GetTagsRequest } from './get-tags.request'

@Injectable()
export class GetTagsService extends DgraphUseCase<GetTagsRequest, Array<ITag>> {
  protected schema = TagSchema.array()

  protected async executeTransaction(request: GetTagsRequest, txn: Txn) {
    const tags = await this.dgraph.getAllNamed<any>(
      txn,
      GetTagsService.createQuery(request),
      'query',
    )

    return tags.map(mapDgraphTag)
  }

  private static createQuery(request: GetTagsRequest) {
    const { currentUser } = request
    const userFilter = `uid_in(owner, ${currentUser.id})`

    const idsFilter = request.input?.ids
      ? `uid(${request.input.ids.join(',')})`
      : undefined

    const filter = `@filter(${userFilter}${
      idsFilter ? ' AND ' + idsFilter : ''
    })`

    return getTagQuery(filter)
  }
}
