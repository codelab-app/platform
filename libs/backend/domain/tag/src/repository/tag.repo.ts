import type { Tag, TagWhere } from '@codelab/backend/abstract/codegen'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { ITagDTO } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'

export class TagRepository extends AbstractRepository<ITagDTO, Tag, TagWhere> {
  private Tag = Repository.instance.Tag

  async _find(where: TagWhere = {}) {
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
    where: TagWhere,
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
