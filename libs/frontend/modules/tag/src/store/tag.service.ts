import { ModalService } from '@codelab/frontend/shared/utils'
import { TagWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateTagDTO,
  ITagDTO,
  ITagService,
  IUpdateTagDTO,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  createContext,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import { tagApi } from './tag.api'
import { Tag } from './tag.model'
import { TagModalService, TagsModalService } from './tag-modal.service'

@model('@codelab/TagService')
export class TagService
  extends Model({
    _tags: prop(() => objectMap<Tag>()),

    selectedTag: prop<Nullish<Ref<Tag>>>(null).withSetter(),
    checkedTags: prop<Array<Ref<Tag>>>(() => []).withSetter(),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new TagModalService({})),
    deleteManyModal: prop(() => new TagsModalService({})),
  })
  implements ITagService
{
  @computed
  get tags() {
    return [...this._tags.values()]
  }

  @computed
  get tagsSelectOptions() {
    return this.tags.map((tag) => ({
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
    const tagModel = Tag.hydrate(tag)

    this._tags.set(tagModel.id, tagModel)

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

    const tagModel = Tag.hydrate(updatedTag)

    this._tags.set(tag.id, tagModel)

    return tagModel
  })

  @modelFlow
  @transaction
  deleteMany = _async(function* (this: TagService, ids: Array<string>) {
    const descendantsIds: Array<string> = []

    const tagsToDelete = ids
      .map((id) => this._tags.get(id))
      .filter((x): x is Tag => !x)

    for (const id of ids) {
      if (this._tags.has(id)) {
        const DescendantsOfTag = yield* _await(this.getTagDescendants(id))
        DescendantsOfTag?.forEach((descendantsId) => {
          descendantsIds.push(descendantsId)
          this._tags.delete(descendantsId)
        })

        this._tags.delete(id)
      }
    }

    const { deleteTags } = yield* _await(
      tagApi.DeleteTags({ where: { id_IN: [...ids, ...descendantsIds] } }),
    )

    if (deleteTags.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    return tagsToDelete
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

  @modelFlow
  @transaction
  getTagGraphs = _async(function* (this: TagService) {
    const { tagGraphs } = yield* _await(tagApi.GetTagGraphs())

    return tagGraphs
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: TagService, where?: TagWhere) {
    const { tags } = yield* _await(tagApi.GetTags({ where }))

    return tags.map((tag) => {
      const tagModel = Tag.hydrate(tag)
      this._tags.set(tag.id, tagModel)

      return tagModel
    })
  })

  @modelAction
  getOrCreateNew(tag: ITagDTO) {
    if (this._tags.has(tag.id)) {
      return this._tags.get(tag.id)
    }

    const tagModel = Tag.hydrate(tag)
    this._tags.set(tag.id, tagModel)

    return tagModel
  }

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

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const tagServiceContext = createContext<TagService>()

export const getTagService = (thisModel: any) => {
  const tagStore = tagServiceContext.get(thisModel)

  if (!tagStore) {
    throw new Error('tagServiceContext is not defined')
  }

  return tagStore
}
