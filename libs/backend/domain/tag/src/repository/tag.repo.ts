import type { ITag } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import {
  connectNode,
  connectNodes,
  connectOwner,
  whereAll,
  whereManyAll,
  whereMaybeNodeId,
  whereNode,
  whereNodeId,
  whereNodeIds,
} from '@codelab/shared/domain/mapper'
import difference from 'lodash/difference'

export class TagRepository extends IRepository<ITag> {
  private Tag = Repository.instance.Tag

  async find(where: BaseUniqueWhere) {
    return (
      await (
        await this.Tag
      ).find({
        where,
        selectionSet: tagSelectionSet,
      })
    )[0]
  }

  async save(data: ITag, where?: BaseUniqueWhere) {
    if (await this.exists(data, where)) {
      return this.update(data, this.getWhere(data, where))
    }

    return (await this.add([data]))[0]
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
          parent: connectNode(tag.parent?.id),
          children: connectNodes(tag.children.map((child) => child.id)),
          owner: connectOwner(owner.auth0Id),
        })),
      })
    ).tags
  }

  protected async _update(
    { parent, children, owner, ...tag }: ITag,
    where: BaseUniqueWhere,
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

    // const parentTagToConnect = difference(
    //   [parent?.id],
    //   [existing.parent?.id],
    // )[0]

    // const parentTagToDisconnect = difference(
    //   [existing.parent?.id],
    //   [parent?.id],
    // )[0]

    /**
     * Children
     */
    // const childrenTagsToConnect = difference(
    //   children.map((t) => t.id),
    //   existing.children.map((t) => t.id),
    // )

    // const childrenTagsToDisconnect = difference(
    //   existing.children.map((t) => t.id),
    //   children.map((t) => t.id),
    // )

    console.log({
      update: tag,
      connect: {
        parent: whereMaybeNodeId(parentTagToConnect),
        children: whereNodeIds(childrenTagsToConnect),
        owner: whereNode('auth0Id', owner.auth0Id),
      },
      /**
       * Disconnect all here
       */
      disconnect: {
        parent: whereAll(),
        children: whereManyAll(),
        owner: whereAll(),
      },
    })

    return (
      await (
        await this.Tag
      ).update({
        update: tag,
        connect: {
          parent: whereMaybeNodeId(parentTagToConnect),
          children: whereNodeIds(childrenTagsToConnect),
          owner: whereNode('auth0Id', owner.auth0Id),
        },
        /**
         * Disconnect all here
         */
        disconnect: {
          parent: whereAll(),
          children: whereManyAll(),
          owner: whereAll(),
        },
        // disconnect: {
        //   parent: parentTagToDisconnect
        //     ? whereNodeId(parentTagToDisconnect)
        //     : null,
        //   children: childrenTagsToDisconnect.map((id) => ({
        //     disconnect: {
        //       parent: whereNodeId(id),
        //     },
        //   })),
        // },
        where,
      })
    ).tags[0]
  }
}
