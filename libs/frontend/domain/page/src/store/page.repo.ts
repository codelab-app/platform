import type { IPage, IPageRepository } from '@codelab/frontend/abstract/core'
import { clearCacheForKey } from '@codelab/frontend/shared/utils'
import type { PageOptions, PageWhere } from '@codelab/shared/abstract/codegen'
import { Model, model } from 'mobx-keystone'
import { pageApi } from './page.api'

@model('@codelab/PageRepository')
export class PageRepository extends Model({}) implements IPageRepository {
  // clear apps cache when we add a new page
  // to make sure that the new page is included in the apps query
  // @clearCacheForKey('apps')
  async add(page: IPage) {
    const {
      createPages: { pages },
    } = await pageApi.CreatePages({ input: page.toCreateInput() })

    return pages[0]!
  }

  async update(page: IPage) {
    const {
      updatePages: { pages },
    } = await pageApi.UpdatePages({
      update: page.toUpdateInput(),
      where: { id: page.id },
    })

    return pages[0]!
  }

  async find(where?: PageWhere, options?: PageOptions) {
    return pageApi.GetPages({ options, where })
  }

  async delete(pages: Array<IPage>) {
    const {
      deletePages: { nodesDeleted },
    } = await pageApi.DeletePages({
      delete: pages[0]?.toDeleteInput(),
      where: { id_IN: pages.map((page) => page.id) },
    })

    return nodesDeleted
  }
}
