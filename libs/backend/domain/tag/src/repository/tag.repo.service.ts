import type { INodeType, ITagDto } from '@codelab/shared/abstract/core'
import type { TagOptions, TagWhere } from '@codelab/shared/infra/gqlgen'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { TagFragment } from '@codelab/shared/infra/gqlgen'
import { tagApi, tagMapper } from '@codelab/shared-domain-module/tag'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TagRepository extends AbstractRepository<
  INodeType.Tag,
  ITagDto,
  TagFragment,
  TagWhere,
  TagOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  /**
   * If parent or children exists, then we should connect them
   */
  protected async _addMany(tags: Array<ITagDto>) {
    const {
      createTags: { tags: createdTags },
    } = await tagApi().CreateTags({
      input: tags.map((tag) => tagMapper.toCreateInput(tag)),
    })

    return createdTags
  }

  protected async _find({
    options,
    where,
  }: {
    where?: TagWhere
    options?: TagOptions
  }) {
    const { items } = await tagApi().GetTags({
      options,
      where,
    })

    return items
  }

  protected async _update(tag: ITagDto, where: TagWhere) {
    const {
      updateTags: { tags },
    } = await tagApi().UpdateTags({
      update: tagMapper.toUpdateInput(tag),
      where,
    })

    return tags[0]
  }
}
