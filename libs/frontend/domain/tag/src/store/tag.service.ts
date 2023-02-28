import type {
  ICreateTagDTO,
  ITag,
  ITagService,
  ITagTreeService,
  IUpdateTagData,
} from '@codelab/frontend/abstract/core'
import { ITagDTO } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { TagWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
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
import { v4 } from 'uuid'
import { tagApi } from './tag.api'
import { Tag, tagRef } from './tag.model'
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
  createSubmit = _async(function* (
    this: TagService,
    data: Array<ICreateTagDTO>,
  ) {
    const input = data.map(({ id, name, parent, owner }) => {
      return {
        id,
        name,
        owner: connectAuth0Owner(owner.auth0Id),
        parent: connectNodeId(parent?.id),
      }
    })

    const {
      createTags: { tags },
    } = yield* _await(
      tagApi.CreateTags({
        input,
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

    return tagModels
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: TagService,
    { id, name, parent }: IUpdateTagData,
  ) {
    const {
      updateTags: { tags },
    } = yield* _await(
      tagApi.UpdateTags({
        where: { id },
        update: { name },
      }),
    )

    return tags.map((tag) => this.add(tag))
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
  add({ id, isRoot, name, parent, children }: ITagDTO) {
    const tag = new Tag({
      id,
      name,
      isRoot,
      parent: parent?.id ? tagRef(parent.id) : null,
      children: children.map((child) => tagRef(child.id)),
    })

    this.tags.set(tag.id, tag)

    return tag
  }
}
