import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import type { ITagDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'

export class TagRepository extends AbstractRepository<
  ITagDTO,
  OGM_TYPES.Tag,
  OGM_TYPES.TagWhere
> {
  private Tag = Repository.instance.Tag

  async find(where: OGM_TYPES.TagWhere = {}) {
    return await (
      await this.Tag
    ).find({
      selectionSet: tagSelectionSet,
      where,
    })
  }

  /**
   * If parent or children exists, then we should connect them
   */
  protected async _add(tags: Array<ITagDTO>) {
    return (
      await (
        await this.Tag
      ).create({
        input: tags.map(({ descendants, owner, ...tag }) => ({
          ...tag,
          children: connectNodeIds(tag.children.map((child) => child.id)),
          owner: connectAuth0Owner(owner),
          parent: connectNodeId(tag.parent?.id),
        })),
      })
    ).tags
  }

  protected async _update(
    { children, descendants, id, owner, parent, ...tag }: ITagDTO,
    where: OGM_TYPES.TagWhere,
  ) {
    // Get existing tag so we know what to connect/disconnect
    const existing = await this.findOne(where)

    if (!existing) {
      return undefined
    }

    /**
     * Parent
     */
    const parentTagToConnect = parent?.id
    const childrenTagsToConnect = children.map((_tag) => _tag.id)

    return (
      await (
        await this.Tag
      ).update({
        update: {
          ...tag,
          parent: reconnectNodeId(parentTagToConnect),
          /**
           * This causes a bug where some nodes aren't connected, can't figure out why maybe race condition
           *
           * It is also unnecessary to have both.
           */
          // children: reconnectNodeIds(childrenTagsToConnect),
        },
        where,
      })
    ).tags[0]
  }
}
