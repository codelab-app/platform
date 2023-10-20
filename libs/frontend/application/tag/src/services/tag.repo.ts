import type { ITagRepository } from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type {
  TagOptions,
  TagUniqueWhere,
  TagWhere,
} from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { tagApi } from '../graphql/tag.api'

@model('@codelab/TagRepository')
export class TagRepository extends Model({}) implements ITagRepository {
  @modelFlow
  add = _async(function* (this: TagRepository, tag: ITagModel) {
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
  delete = _async(function* (this: TagRepository, tags: Array<ITagModel>) {
    const {
      deleteTags: { nodesDeleted },
    } = yield* _await(
      tagApi.DeleteTags({
        where: { id_IN: tags.map(({ id }) => id) },
      }),
    )

    return nodesDeleted
  })

  @modelFlow
  find = _async(function* (
    this: TagRepository,
    where?: TagWhere,
    options?: TagOptions,
  ) {
    return yield* _await(tagApi.GetTags({ options, where }))
  })

  @modelFlow
  findOne = _async(function* (this: TagRepository, where: TagUniqueWhere) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (this: TagRepository, tag: ITagModel) {
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
}
