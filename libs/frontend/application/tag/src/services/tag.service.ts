import type { ITagService } from '@codelab/frontend/abstract/application'
import type {
  ICreateTagData,
  ITagModel,
  IUpdateTagData,
} from '@codelab/frontend/abstract/domain'
import {
  InlineFormService,
  ModalService,
  PaginationService,
} from '@codelab/frontend/application/shared/store'
import { TagDomainService, tagRef } from '@codelab/frontend/domain/tag'
import type { TagOptions, TagWhere } from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { TagRepository } from './tag.repo'
import { TagFormService } from './tag-form.service'
import { TagModalService, TagsModalService } from './tag-modal.service'

@model('@codelab/TagService')
export class TagService
  extends Model({
    checkedTags: prop<Array<Ref<ITagModel>>>(() => []).withSetter(),
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteManyModal: prop(() => new TagsModalService({})),
    paginationService: prop(
      () => new PaginationService<ITagModel, { name?: string }>({}),
    ),
    tagDomainService: prop(() => new TagDomainService({})),
    tagRepository: prop(() => new TagRepository({})),
    updateForm: prop(() => new TagFormService({})),
    updateModal: prop(() => new TagModalService({})),
  })
  implements ITagService
{
  @modelFlow
  @transaction
  create = _async(function* (this: TagService, data: ICreateTagData) {
    const tag = this.tagDomainService.hydrate({
      ...data,
      children: [],
      descendants: [],
      isRoot: !data.parent?.id,
    })

    yield* _await(this.tagRepository.add(tag))

    this.paginationService.dataRefs.set(tag.id, tagRef(tag))

    if (!tag.parent) {
      return tag
    }

    const [parentTag] = yield* _await(this.getAll({ id: tag.parent.id }))

    // This updates the children tag of the parent
    if (parentTag) {
      this.tagDomainService.tags.set(parentTag.id, parentTag)
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
      this.tagDomainService.tags.delete(tag.id)
      tagsToRemove.push(tag)

      // Remove descendants
      tag.descendants.forEach((descendant) => {
        tagsToRemove.push(descendant)
        this.tagDomainService.tags.delete(descendant.id)
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
  getAll = _async(function* (
    this: TagService,
    where?: TagWhere,
    options?: TagOptions,
  ) {
    const {
      aggregate: { count },
      items: tags,
    } = yield* _await(this.tagRepository.find(where, options))

    this.paginationService.totalItems = count

    return tags.map((tag) => this.tagDomainService.hydrate(tag))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: TagService,
    { id, name, parent }: IUpdateTagData,
  ) {
    const tag = this.tagDomainService.tags.get(id)!

    tag.writeCache({ name, parent })

    yield* _await(this.tagRepository.update(tag))!

    return tag
  })

  onAttachedToRootStore() {
    this.paginationService.getDataFn = async (page, pageSize, filter) => {
      const items = await this.getAll(
        { name_MATCHES: `(?i).*${filter.name ?? ''}.*` },
        {
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
      )

      return { items, totalItems: this.paginationService.totalItems }
    }
  }
}
