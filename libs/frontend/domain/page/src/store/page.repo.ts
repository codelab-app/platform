import type { IPage, IPageRepository } from '@codelab/frontend/abstract/core'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { pageApi } from './page.api'

@model('@codelab/PageRepository')
export class PageRepository extends Model({}) implements IPageRepository {
  @modelFlow
  add = _async(function* (this: PageRepository, page: IPage) {
    const {
      createPages: { pages },
    } = yield* _await(pageApi.CreatePages({ input: page.toCreateInput() }))

    return pages[0]!
  })

  @modelFlow
  update = _async(function* (this: PageRepository, page: IPage) {
    const {
      updatePages: { pages },
    } = yield* _await(
      pageApi.UpdatePages({
        update: page.toUpdateInput(),
        where: { id: page.id },
      }),
    )

    return pages[0]!
  })

  @modelFlow
  find = _async(function* (this: PageRepository, where: AppWhere) {
    const { pages } = yield* _await(pageApi.GetPages({ where }))

    return pages
  })

  @modelFlow
  delete = _async(function* (this: PageRepository, pages: Array<IPage>) {
    const {
      deletePages: { nodesDeleted },
    } = yield* _await(
      pageApi.DeletePages({
        delete: pages[0]?.toDeleteInput(),
        where: { id_IN: pages.map((page) => page.id) },
      }),
    )

    return nodesDeleted
  })
}
