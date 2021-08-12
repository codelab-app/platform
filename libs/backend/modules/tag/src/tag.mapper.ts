import { DgraphTag } from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { Tag } from './models'

@Injectable()
export class TagMapper implements Mapper<DgraphTag, Tag> {
  async map({ name, uid }: DgraphTag): Promise<Tag> {
    return new Tag({ id: uid, name })
  }
}
