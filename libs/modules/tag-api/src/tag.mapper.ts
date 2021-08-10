import { DgraphTag, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Tag } from './models/tag.model'

@Injectable()
export class TagMapper implements Mapper<DgraphTag, Tag> {
  async map({ name, uid }: DgraphTag): Promise<Tag> {
    return new Tag({ id: uid, name })
  }
}
