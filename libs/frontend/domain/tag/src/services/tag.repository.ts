import type { ITag, ITagRepository } from '@codelab/frontend/abstract/core'
import type { TagWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { tagApi } from '../store/tag.api'

@model('@codelab/TagRepository')
export class TagRepository extends Model({}) implements ITagRepository {
  @modelFlow
  add = _async(function* (this: TagRepository, tag: ITag) {
    const {
      createTags: { tags },
    } = yield* _await(
      tagApi.CreateTags({
        input: [tag.toCreateInput()],
      }),
    )

    return tags[0]!
  })

  @modelFlow
  update = _async(function* (this: TagRepository, tag: ITag) {
    const {
      updateTags: { tags },
    } = yield* _await(
      tagApi.UpdateTags({
        update: tag.toUpdateInput(),
        where: { id: tag.id },
      }),
    )

    return tags[0]!
  })

  @modelFlow
  find = _async(function* (this: TagRepository, where?: TagWhere) {
    const { tags } = yield* _await(tagApi.GetTags({ where }))

    return tags
  })

  @modelFlow
  delete = _async(function* (this: TagRepository, tags: Array<ITag>) {
    const {
      deleteTags: { nodesDeleted },
    } = yield* _await(
      tagApi.DeleteTags({
        where: { id_IN: tags.map(({ id }) => id) },
      }),
    )

    return nodesDeleted
  })
}
