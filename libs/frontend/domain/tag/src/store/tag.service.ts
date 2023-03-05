import type {
  ICreateTagData,
  ITag,
  ITagService,
  ITagTreeService,
  IUpdateTagData,
} from '@codelab/frontend/abstract/core'
import { ITagDTO } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { TagWhere } from '@codelab/shared/abstract/codegen'
import type { Nullish } from '@codelab/shared/abstract/types'
import {
  connectAuth0Owner,
  connectNodeId,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { tagApi } from './tag.api'
import { Tag, tagRef } from './tag.model'
import { TagModalService, TagsModalService } from './tag-modal.service'
import { TagTreeService } from './tag-tree.service'

@model('@codelab/TagService')
export class TagService
  extends Model({
    checkedTags: prop<Array<Ref<ITag>>>(() => []).withSetter(),
    createModal: prop(() => new ModalService({})),
    deleteManyModal: prop(() => new TagsModalService({})),
    selectedTag: prop<Nullish<Ref<ITag>>>(null).withSetter(),
    tags: prop(() => objectMap<ITag>()),
    treeService: prop<ITagTreeService>(() => TagTreeService.init([])),
    updateModal: prop(() => new TagModalService({})),
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
  create = _async(function* (
    this: TagService,
    { id, name, parent, owner }: ICreateTagData,
  ) {
    const {
      createTags: { tags },
    } = yield* _await(
      tagApi.CreateTags({
        input: {
          id,
          name,
          owner: connectAuth0Owner(owner),
          parent: connectNodeId(parent?.id),
        },
      }),
    )

    const otherTagIdsToUpdate = [
      ...tags
        .map((tag) => tag.parent?.id)
        .filter((tag): tag is string => Boolean(tag)),
    ]

    const tagsToUpdate = yield* _await(
      this.getAll({ id_IN: otherTagIdsToUpdate }),
    )

    const tagModels = [...tags, ...tagsToUpdate].map((tag) => this.add(tag))

    this.treeService.addRoots(tagModels)

    return tagModels[0]!
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: TagService,
    { id, name, parent }: IUpdateTagData,
  ) {
    const tag = this.tags.get(id)

    tag?.writeCache({ name, parent })

    const {
      updateTags: { tags },
    } = yield* _await(
      tagApi.UpdateTags({
        update: {
          name,
          parent: parent ? reconnectNodeId(parent.id) : undefined,
        },
        where: { id },
      }),
    )

    return tag!
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TagService, ids: Array<string>) {
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

    const {
      deleteTags: { nodesDeleted },
    } = yield* _await(
      tagApi.DeleteTags({ where: { id_IN: [...ids, ...descendantsIds] } }),
    )

    return nodesDeleted
  })

  @modelFlow
  @transaction
  deleteCheckedTags = _async(function* (this: TagService) {
    const checkedTags = this.checkedTags.map((checkedTag) => checkedTag.current)

    checkedTags.length &&
      (yield* _await(this.delete(checkedTags.map((tag) => tag.id))))
  })

  @computed
  get tagsList() {
    return Array.from(this.tags.values())
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: TagService, where?: TagWhere) {
    const { tags } = yield* _await(tagApi.GetTags({ where }))

    return tags.map((tag) => this.add(tag))
  })

  @modelAction
  add({ id, isRoot, name, parent, children, descendants }: ITagDTO) {
    const tag = new Tag({
      children: children.map((child) => tagRef(child.id)),
      descendants: descendants.map((child) => tagRef(child.id)),
      id,
      isRoot,
      name,
      parent: parent?.id ? tagRef(parent.id) : null,
    })

    this.tags.set(tag.id, tag)

    return tag
  }
}
