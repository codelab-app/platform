import type {
  ITag,
  IUserRef,
  TagNodeData,
} from '@codelab/backend/abstract/core'
import { IInterfaceType } from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import { IUseCase } from '@codelab/backend/abstract/types'
import { TagRepository } from '@codelab/backend/domain/tag'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'
import { createTagTreeData, flattenTagTree } from './tag-input.factory'

export class SeedTagsService extends IUseCase<IUserRef, void> {
  tagRepository: TagRepository = new TagRepository()

  async _execute(owner: IUserRef) {
    const tags = this.createTagsData(owner)

    await Promise.all(
      tags.map(
        async (tag) => await this.tagRepository.save(tag, { name: tag.name }),
      ),
    )
  }

  /**
   * Here we want to flatten the hierarchical data
   */
  private createTagsData(owner: IUserRef): Array<ITag> {
    const tagData: Array<TagNodeData & { id: string }> = createTagTreeData()
      .flatMap((node) => flattenTagTree(node))
      .map((node) => ({ ...node, id: v4() }))

    const tagDataMap = new Map(tagData.map((tag) => [tag.name, tag]))

    return tagData.map((tag) => {
      const parent = tag.parent ? tagDataMap.get(tag.parent) : null

      return {
        id: tag.id,
        owner,
        name: tag.name,
        children: tag.children
          .map((child) => {
            const childTag = tagDataMap.get(child.name)

            if (!childTag) {
              throw new Error('Missing child tag')
            }

            return {
              id: childTag.id || v4(),
              name: childTag.name,
            }
          })
          .filter((child): child is Pick<OGM_TYPES.Tag, 'id' | 'name'> =>
            Boolean(child),
          ),
        parent: parent ? { id: parent.id, name: parent.name } : undefined,
      }
    })
  }
}
