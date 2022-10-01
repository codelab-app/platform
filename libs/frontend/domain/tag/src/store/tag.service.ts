import { ModalService } from '@codelab/frontend/shared/utils'
import { TagWhere } from '@codelab/shared/abstract/codegen'
import type {
  ICreateTagDTO,
  ITag,
  ITagDTO,
  ITagService,
  ITagTreeService,
  IUpdateTagDTO,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { connectNode, connectOwner } from '@codelab/shared/data'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { tagApi } from './tag.api'
import { Tag } from './tag.model'
import { TagModalService, TagsModalService } from './tag-modal.service'
import { TagTreeService } from './tag-tree.service'

@model('@codelab/TagService')
export class TagService
  extends Model({
    tags: prop(() => objectMap<ITag>()),
    treeService: prop<ITagTreeService>(() => TagTreeService.init([])),
    selectedTag: prop<Nullish<Ref<ITag>>>(null).withSetter(),
    checkedTags: prop<Array<Ref<ITag>>>(() => []).withSetter(),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new TagModalService({})),
    deleteManyModal: prop(() => new TagsModalService({})),
  })
  implements ITagService
{
  /**
   * To load all tags & initialize the tree
   */
  @modelFlow
  loadTagTree = _async(function* (this: TagService) {
    const tags = yield* _await(this.getAll())
    this.treeService = TagTreeService.init(tags)
  })

  tag(id: string) {
    return this.tags.get(id)
  }

  @computed
  get tagsSelectOptions() {
    return this.tagsList.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }))
  }

  @computed
  get selectedOption() {
    return {
      label: this.selectedTag?.current.name ?? '',
      value: this.selectedTag?.current.id ?? '',
    }
  }

  @modelFlow
  @transaction
  create = _async(function* (this: TagService, data: Array<ICreateTagDTO>) {
    const input = data.map((tag) => {
      return {
        id: v4(),
        name: tag.name,
        owner: connectOwner(tag.auth0Id),
        parent: connectNode(tag.parentTagId),
      }
    })

    const {
      createTags: { tags },
    } = yield* _await(
      tagApi.CreateTags({
        input,
      }),
    )

    if (!tags.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Tag was not created')
    }

    const otherTagIdsToUpdate = [
      ...tags
        .map((tag) => tag.parent?.id)
        .filter((tag): tag is string => Boolean(tag)),
    ]

    const tagsToUpdate = yield* _await(
      this.getAll({ id_IN: otherTagIdsToUpdate }),
    )

    const tagModels = [...tags, ...tagsToUpdate].map((tag) => {
      let tagModel = this.tags.get(tag.id)

      if (!tagModel) {
        tagModel = Tag.hydrate(tag)
        this.tags.set(tagModel.id, tagModel)
      } else {
        tagModel = tagModel.writeCache(tag)
      }

      return tagModel
    })

    this.treeService.addRoots(tagModels)

    return tagModels
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: TagService,
    tag: ITag,
    input: IUpdateTagDTO,
  ) {
    const {
      updateTags: { tags },
    } = yield* _await(
      tagApi.UpdateTags({
        where: { id: tag.id },
        update: { ...input },
      }),
    )

    const updatedTag = tags[0]

    if (!updatedTag) {
      throw new Error('Failed to update tag')
    }

    const tagModel = Tag.hydrate(updatedTag)

    this.tags.set(tag.id, tagModel)

    return tagModel
  })

  @modelFlow
  @transaction
  deleteMany = _async(function* (this: TagService, ids: Array<string>) {
    const descendantsIds: Array<string> = []
    const tags = yield* _await(this.getAll({ id_IN: ids }))

    for (const tag of tags) {
      // Remove parent
      this.tags.delete(tag.id)

      // Remove descendants
      tag.descendants.forEach((descendant) => {
        descendantsIds.push(descendant.id)
        this.tags.delete(descendant.id)
      })
    }

    const { deleteTags } = yield* _await(
      tagApi.DeleteTags({ where: { id_IN: [...ids, ...descendantsIds] } }),
    )

    if (deleteTags.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    return []
  })

  @modelFlow
  @transaction
  deleteCheckedTags = _async(function* (this: TagService) {
    const checkedTags = this.checkedTags.map(
      (checkedTag) => checkedTag?.current,
    )

    checkedTags.length &&
      (yield* _await(this.deleteMany(checkedTags.map((tag) => tag.id))))
  })

  @computed
  get tagsList() {
    return Array.from(this.tags.values())
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: TagService, where?: TagWhere) {
    const { tags } = yield* _await(tagApi.GetTags({ where }))

    return tags.map((tag) => this.writeCache(tag))
  })

  @modelAction
  writeCache = (tag: ITagDTO) => {
    console.debug('TagService.writeCache', tag)

    let tagModel = this.tags.get(tag.id)

    if (tagModel) {
      tagModel = tagModel.writeCache(tag)
    } else {
      tagModel = Tag.hydrate(tag)
      this.tags.set(tag.id, tagModel)
    }

    return tagModel
  }
}
