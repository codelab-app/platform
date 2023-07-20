import type {
  ICreateTagData,
  ITag,
  ITagService,
  ITagTreeService,
  IUpdateTagData,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { TagWhere } from '@codelab/shared/abstract/codegen'
import { ITagDTO } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
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
import { TagRepository } from '../services/tag.repo'
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
    tagRepository: prop(() => new TagRepository({})),
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
  create = _async(function* (this: TagService, data: ICreateTagData) {
    const tag = this.add({
      ...data,
      children: [],
      descendants: [],
      isRoot: !data.parent?.id,
    })

    this.treeService.addRoots([tag])

    yield* _await(this.tagRepository.add(tag))

    if (!tag.parent) {
      return tag
    }

    const [parentTag] = yield* _await(this.getAll({ id: tag.parent.id }))

    if (parentTag) {
      this.tags.set(parentTag.id, parentTag)

      this.treeService.addRoots([tag, parentTag])
    }

    return tag
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: TagService,
    { id, name, parent }: IUpdateTagData,
  ) {
    const tag = this.tags.get(id)!

    tag.writeCache({ name, parent })

    yield* _await(this.tagRepository.update(tag))!

    return tag
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TagService, ids: Array<string>) {
    const tags = yield* _await(this.getAll({ id_IN: ids }))
    const tagsToRemove = []

    for (const tag of tags) {
      // Remove parent
      this.tags.delete(tag.id)
      tagsToRemove.push(tag)

      // Remove descendants
      tag.descendants.forEach((descendant) => {
        tagsToRemove.push(descendant)
        this.tags.delete(descendant.id)
      })
    }

    return yield* _await(this.tagRepository.delete(tagsToRemove))
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
    const { items: tags } = yield* _await(this.tagRepository.find(where))

    return tags.map((tag) => this.add(tag))
  })

  @modelAction
  add({ children, descendants, id, isRoot, name, owner, parent }: ITagDTO) {
    const tag = new Tag({
      children: children?.map((child) => tagRef(child.id)),
      descendants: descendants?.map((child) => tagRef(child.id)),
      id,
      isRoot,
      name,
      owner,
      parent: parent?.id ? tagRef(parent.id) : null,
    })

    this.tags.set(tag.id, tag)

    return tag
  }
}
