import type { INodeType } from '@codelab/shared/abstract/core'
import type { Tag, TagOptions, TagWhere } from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { type ITagDto } from '@codelab/shared/abstract/core'
import { TagFragment } from '@codelab/shared/infra/gql'
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
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
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
