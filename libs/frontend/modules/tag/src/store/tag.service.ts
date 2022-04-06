import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { CreateTagData } from '../use-cases/create-tag/createTagSchema'
import { UpdateTagData } from '../use-cases/update-tag/updateTagSchema'
import { tagApi } from './tag.api'
import { Tag } from './tag.model'
import { TagModalService, TagsModalService } from './tag-modal.service'

export interface WithTagService {
  tagService: TagService
}

@model('codelab/TagService')
export class TagService extends Model({
  tags: prop(() => objectMap<Tag>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new TagModalService({})),
  deleteModal: prop(() => new TagsModalService({})),
}) {
  @computed
  get tagsList() {
    return [...this.tags.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (this: TagService, input: CreateTagData) {
    const {
      createTags: { tags },
    } = yield* _await(
      tagApi.CreateTags({
        input,
      }),
    )

    const tag = tags[0]
    const tagModel = Tag.fromFragment(tag)

    this.tags.set(tagModel.id, tagModel)

    return tagModel
  })

  @modelFlow
  @transaction
  update = _async(function* (this: TagService, tag: Tag, input: UpdateTagData) {
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

    for (const id of ids) {
      if (this.tags.has(id)) {
        this.tags.delete(id)
      }
    }

    const { deleteTags } = yield* _await(
      tagApi.DeleteTags({ where: { id_IN: ids } }),
    )

    if (deleteTags.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    return
  })

  @modelFlow
  @transaction
  getTagGraphs = _async(function* (this: TagService) {
    const { tagGraphs } = yield* _await(tagApi.GetTagGraphs())

    const tagIds = tagGraphs.reduce<any>((ids, tagGraph) => {
      return [...ids, ...tagGraph.descendants]
    }, [])

    const { tags } = yield* _await(
      tagApi.GetTags({
        where: {
          id_IN: tagIds,
        },
      }),
    )

    tags.forEach((tag) => {
      const tagModel = Tag.fromFragment(tag)
      this.tags.set(tag.id, tagModel)
    })
  })
}
