import { DgraphEntityType, DgraphQueryBuilder } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { GetTagTreeRequest } from './get-tag-tree.request'

@Injectable()
export class GetTagTreeService {
  static createQuery(request: GetTagTreeRequest) {
    return new DgraphQueryBuilder()
      .addEqFilterDirective('ownerId', request.owner.sub)
      .setTypeFunc(DgraphEntityType.TagTree)
      .addBaseFields()
      .addExpandAll()
  }
}
