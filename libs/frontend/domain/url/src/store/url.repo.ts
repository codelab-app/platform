import type {
  IUrlModel,
  IUrlRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  UrlOptions,
  UrlUniqueWhere,
  UrlWhere,
} from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { urlApi } from './url.api'

@model('@codelab/UrlRepository')
export class UrlRepository extends Model({}) implements IUrlRepository {
  @modelFlow
  add = _async(function* (this: UrlRepository, url: IUrlModel) {
    const {
      createUrls: { urls },
    } = yield* _await(
      urlApi.CreateUrls({
        input: [url.toCreateInput()],
      }),
    )

    return urls[0]!
  })

  @modelFlow
  delete = _async(function* (this: UrlRepository, urls: Array<IUrlModel>) {
    const {
      deleteUrls: { nodesDeleted },
    } = yield* _await(
      urlApi.DeleteUrls({
        where: { id_IN: urls.map((url) => url.id) },
      }),
    )

    return nodesDeleted
  })

  @modelFlow
  find = _async(function* (
    this: UrlRepository,
    where?: UrlWhere,
    options?: UrlOptions,
  ) {
    return yield* _await(urlApi.GetUrls({ options, where }))
  })

  @modelFlow
  findOne = _async(function* (this: UrlRepository, where: UrlUniqueWhere) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (this: UrlRepository, url: IUrlModel) {
    const {
      updateUrls: { urls },
    } = yield* _await(
      urlApi.UpdateUrls({
        update: url.toUpdateInput(),
        where: { id: url.id },
      }),
    )

    return urls[0]!
  })
}
