import type { ITagService } from '@codelab/frontend/abstract/application'
import type {
  ICreateTagData,
  ITagModel,
  ITagTreeService,
  IUpdateTagData,
} from '@codelab/frontend/abstract/domain'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend/domain/shared'
import { Tag, tagRef } from '@codelab/frontend/domain/tag'
import type { TagWhere } from '@codelab/shared/abstract/codegen'
import type { ITagDTO } from '@codelab/shared/abstract/core'
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
import { TagRepository } from './tag.repo'
import { TagFormService } from './tag-form.service'
import { TagModalService, TagsModalService } from './tag-modal.service'
import { TagTreeService } from './tag-tree.service'

@model('@codelab/TagService')
export class TagService
  extends Model({
    checkedTags: prop<Array<Ref<ITagModel>>>(() => []).withSetter(),
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteManyModal: prop(() => new TagsModalService({})),
    selectedTag: prop<Nullish<Ref<ITagModel>>>(null).withSetter(),
    tagRepository: prop(() => new TagRepository({})),
    tags: prop(() => objectMap<ITagModel>()),
    treeService: prop<ITagTreeService>(() => TagTreeService.init([])),
    updateForm: prop(() => new TagFormService({})),
    updateModal: prop(() => new TagModalService({})),
  })
  implements ITagService
{
  @computed
  get selectedOption() {
    return {
      label: this.selectedTag?.current.name ?? '',
      value: this.selectedTag?.current.id ?? '',
    }
  }

  @computed
  get tagsList() {
    return Array.from(this.tags.values())
  }

  @computed
  get tagsSelectOptions() {
    return this.tagsList.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }))
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

  @modelFlow
  @transaction
  getAll = _async(function* (this: TagService, where?: TagWhere) {
    const { items: tags } = yield* _await(this.tagRepository.find(where))

    return tags.map((tag) => this.add(tag))
  })

  /**
   * To load all tags & initialize the tree
   */
  @modelFlow
  loadTagTree = _async(function* (this: TagService) {
    const tags = yield* _await(this.getAll())
    this.treeService = TagTreeService.init(tags)
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

  @modelAction
  add = ({ children, descendants, id, isRoot, name, parent }: ITagDTO) => {
    const tag = new Tag({
      children: children?.map((child) => tagRef(child.id)),
      descendants: descendants?.map((child) => tagRef(child.id)),
      id,
      isRoot: isRoot === undefined ? !parent?.id : isRoot,
      name,
      parent: parent?.id ? tagRef(parent.id) : null,
    })

    this.tags.set(tag.id, tag)

    return tag
  }

  tag(id: string) {
    return this.tags.get(id)
  }
}
