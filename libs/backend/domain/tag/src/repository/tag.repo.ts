import type { Tag, TagWhere } from '@codelab/backend/abstract/codegen'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IAuth0Owner, ITagDTO } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeId,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { withTracing } from '@codelab/shared/infra/otel'
import { cLog } from '@codelab/shared/utils'

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
        input: tags.map(({ children, descendants, owner, parent, ...tag }) => ({
          ...tag,
          children: connectNodeIds(children?.map((child) => child.id)),
          owner: connectAuth0Owner(owner),
          // parent: connectNodeId(parent?.id),
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
    const childrenTagsToConnect = children?.map((child) => child.id)

    // cLog('Existing:', tag, 'Tags to connect', parentTagToConnect)

    return (
      await (
        await this.Tag
      ).update({
        update: {
          ...tag,
          /**
           * This causes a bug where some nodes aren't connected, can't figure out why maybe race condition
           *
           * It is also unnecessary to have both.
           */
          children: reconnectNodeIds(childrenTagsToConnect),
          // parent: reconnectNodeId(parentTagToConnect),
        },
        where,
      })
    ).tags[0]
  }

  /**
   * Seed tags solve the issue of missing target children or parent when creating them for the first time
   */

  async seedTags(tags: Array<ITagDTO>, owner: IAuth0Owner) {
    /**
     * Omit parent and children since they need to be created first
     */

    await withTracing('Create nodes', async () => {
      await Promise.all(
        tags.map(async ({ children, parent, ...tag }) => {
          return this.save({ ...tag, owner }, { name: tag.name })
        }),
      )
    })()

    /**
     * set parent and children after all tags are created
     */
    await withTracing('Assign relationships', async () => {
      await Promise.all(
        tags.map(async (tag) => {
          return this.save(tag, { name: tag.name })
        }),
      )
    })()
  }
}
