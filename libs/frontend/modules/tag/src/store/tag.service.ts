import { ModalService } from '@codelab/frontend/shared/utils'
import { ICreateTagDTO, IUpdateTagDTO } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import { tagApi } from './tag.api'
import { Tag } from './tag.model'
import { TagModalService, TagsModalService } from './tag-modal.service'

export interface WithTagService {
  tagService: TagService
}

@model('codelab/TagService')
export class TagService extends Model({
  tags: prop(() => objectMap<Tag>()),

  selectedTag: prop<Nullish<Ref<Tag>>>(() => null).withSetter(),
  checkedTags: prop(() => Array<Ref<Tag>>()).withSetter(),

  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new TagModalService({})),
  deleteModal: prop(() => new TagsModalService({})),
}) {
  @computed
  get tagsList() {
    return [...this.tags.values()]
  }

  @computed
  get tagsListOptions() {
    return this.tagsList.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }))
  }

  @computed
  get seletedTagOption() {
    return {
      lable: this.selectedTag?.current.name,
      value: this.selectedTag?.current.id,
    }
  }

  @modelFlow
  @transaction
  create = _async(function* (this: TagService, input: ICreateTagDTO) {
    const connectParentWhere = input?.parentTagId && {
      parent: {
        connect: {
          where: {
            node: {
              id: input.parentTagId,
            },
          },
        },
      },
    }

    const {
      createTags: { tags },
    } = yield* _await(
      tagApi.CreateTags({
        input: {
          name: input.name,
          ...connectParentWhere,
        },
      }),
    )

    const tag = tags[0]
    const tagModel = Tag.fromFragment(tag)

    this.tags.set(tagModel.id, tagModel)

    return tagModel
  })

  @modelFlow
  @transaction
  update = _async(function* (this: TagService, tag: Tag, input: IUpdateTagDTO) {
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

    const tagModel = Tag.fromFragment(updatedTag)

    this.tags.set(tag.id, tagModel)

    return tagModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TagService, tags: Array<Tag>) {
    const ids = tags.map((tag) => tag.id)
    const descendantsIds: Array<string> = []

    for (const id of ids) {
      if (this.tags.has(id)) {
        const DescendantsOfTag = yield* _await(this.getTagDescendants(id))
        DescendantsOfTag?.forEach((descendantsId) => {
          descendantsIds.push(descendantsId)
          this.tags.delete(descendantsId)
        })

        this.tags.delete(id)
      }
    }

    const { deleteTags } = yield* _await(
      tagApi.DeleteTags({ where: { id_IN: [...ids, ...descendantsIds] } }),
    )

    if (deleteTags.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    return deleteTags
  })

  @modelFlow
  @transaction
  deleteCheckedTags = _async(function* (this: TagService) {
    const checkedTags = this.checkedTags.map(
      (checkedTag) => checkedTag?.current,
    )

    checkedTags.length && (yield* _await(this.delete(checkedTags)))
  })

  @modelFlow
  @transaction
  getTagGraphs = _async(function* (this: TagService) {
    const { tagGraphs } = yield* _await(tagApi.GetTagGraphs())

    return tagGraphs
  })

  @modelFlow
  @transaction
  getTags = _async(function* (this: TagService) {
    const { tags } = yield* _await(tagApi.GetTags())

    tags.forEach((tag) => {
      const tagModel = Tag.fromFragment(tag)
      this.tags.set(tag.id, tagModel)
    })
  })

  @modelFlow
  @transaction
  getTagDescendants = _async(function* (this: TagService, tagId: string) {
    const { tagGraphs } = yield* _await(tagApi.GetTagGraphs())

    const tagWithDescendants = tagGraphs.find(
      (tagGraph) => tagGraph.id === tagId,
    )

    return tagWithDescendants?.descendants
  })
}
