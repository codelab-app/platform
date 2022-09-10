import { ModalService } from '@codelab/frontend/shared/utils'
import { TagWhere } from '@codelab/shared/abstract/codegen'
import type {
  ICreateTagDTO,
  IGraphQLTagNode,
  ITag,
  ITagDTO,
  ITagGraphDTO,
  ITagService,
  ITagTreeNode,
  IUpdateTagDTO,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
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
import { v4 } from 'uuid'
import { tagApi } from './tag.api'
import { Tag } from './tag.model'
import { TagModalService, TagsModalService } from './tag-modal.service'
import { TreeService } from './tree.service'

@model('@codelab/TagService')
export class TagService
  extends Model({
    tags: prop(() => objectMap<ITag>()),
    loadingAntdTreeDataNode: prop(false),
    antdTreeDataNode: prop<Array<DataNode>>(() => []),
    tagGraphs: prop<Array<any>>(() => []),
    treeService: prop<TreeService<any, any>>(() =>
      TreeService.init({ nodes: [] }),
    ),
    selectedTag: prop<Nullish<Ref<ITag>>>(null).withSetter(),
    checkedTags: prop<Array<Ref<ITag>>>(() => []).withSetter(),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new TagModalService({})),
    deleteManyModal: prop(() => new TagsModalService({})),
  })
  implements ITagService
{
  tag(id: string) {
    return this.tags.get(id)
  }

  @computed
  get tagsSelectOptions() {
    return Array.from(this.tags.values()).map((tag) => ({
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
        owner: { connect: { where: { node: { auth0Id: tag.auth0Id } } } },
        parent: {
          connect: tag.parentTagId
            ? {
                where: {
                  node: {
                    id: tag.parentTagId,
                  },
                },
              }
            : null,
        },
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

    this.treeService.addNodesFromFragments(tags)
    this.antdTreeDataNode = this.treeService.generateTreeDataNodes()

    return tags.map((tag) => {
      const tagModel = Tag.hydrate(tag)

      this.tags.set(tagModel.id, tagModel)

      return tagModel
    })
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: TagService,
    tag: ITagTreeNode,
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
    this.treeService.updateNodeFromFragment(updatedTag)
    this.antdTreeDataNode = this.treeService.generateTreeDataNodes()

    return tagModel
  })

  @modelFlow
  @transaction
  deleteMany = _async(function* (this: TagService, ids: Array<string>) {
    const descendantsIds: Array<string> = []

    const tagsToDelete = ids
      .map((id) => this.tags.get(id))
      .filter((x): x is Tag => !x)

    for (const id of ids) {
      if (this.tags.has(id)) {
        const DescendantsOfTag = yield* _await(this.getTagDescendants(id))
        DescendantsOfTag?.forEach((descendantsId) => {
          descendantsIds.push(descendantsId)
          this.tags.delete(descendantsId)
          this.treeService.delete(id)
        })

        this.tags.delete(id)
        this.treeService.delete(id)
      }
    }

    this.antdTreeDataNode = this.treeService.generateTreeDataNodes()

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

    this.tagGraphs = tagGraphs

    const makeupResponse: Array<IGraphQLTagNode> =
      this.tagGraphs?.map((tag: ITagGraphDTO) => ({
        id: tag.id,
        label: tag.name,
        children: tag.descendants,
        isRoot: Boolean(tag.isRoot),
      })) || []

    const treeService = TreeService.init<IGraphQLTagNode>({
      nodes: makeupResponse,
    })

    this.antdTreeDataNode = treeService.generateTreeDataNodes()
    this.treeService = treeService

    return tagGraphs
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: TagService, where?: TagWhere) {
    const { tags } = yield* _await(tagApi.GetTags({ where }))

    return tags.map((tag) => this.writeCache(tag))
  })

  @modelAction
  writeCache = (tag: ITagDTO) => {
    let tagModel = this.tags.get(tag.id)

    if (!tagModel) {
      tagModel = Tag.hydrate(tag)
    } else {
      // tagModel = tagModel.writeCache(tag)
    }

    this.tags.set(tag.id, tagModel)

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

export const tagServiceContext = createContext<TagService>()

export const getTagService = (thisModel: any) => {
  const tagStore = tagServiceContext.get(thisModel)

  if (!tagStore) {
    throw new Error('tagServiceContext is not defined')
  }

  return tagStore
}
