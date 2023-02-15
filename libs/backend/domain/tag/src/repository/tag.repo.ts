import type { ITag } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
  reconnectNodeId,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'

export class TagRepository extends IRepository<ITag> {
  private Tag = Repository.instance.Tag

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.Tag
      ).find({
        where,
        selectionSet: tagSelectionSet,
      })
    )[0]
  }

  /**
   * If parent or children exists, then we should connect them
   */
  protected async _add(tags: Array<ITag>) {
    return (
      await (
        await this.Tag
      ).create({
        input: tags.map(({ owner, ...tag }) => ({
          ...tag,
          parent: connectNodeId(tag.parent?.id),
          children: connectNodeIds(tag.children.map((child) => child.id)),
          owner: connectOwner(owner.auth0Id),
        })),
      })
    ).tags
  }

  protected async _update(
    { parent, children, owner, ...tag }: ITag,
    where: BaseTypeUniqueWhere,
  ) {
    // Get existing tag so we know what to connect/disconnect
    const existing = await this.find(where)

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
          children: reconnectNodeIds(childrenTagsToConnect),
        },
        where,
      })
    ).tags[0]
  }
}
