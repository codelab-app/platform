import type { IPageRepository } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { Page } from '@codelab/frontend-domain-page/store'
import type {
  PageOptions,
  PageUniqueWhere,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IPage } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { Model, model } from 'mobx-keystone'
import { pageApi } from './page.api'

@model('@codelab/PageRepository')
export class PageRepository extends Model({}) implements IPageRepository {
  // clear apps cache when we add a new page
  // to make sure that the new page is included in the apps query
  // @clearCacheForKey('apps')
  async add(page: IPageModel) {
    const {
      createPages: { pages },
    } = await pageApi.CreatePages({ input: page.toCreateInput() })

    const createdPage = pages[0]

    assertIsDefined(createdPage)

    return createdPage
  }

  async delete(pages: Array<IPage>) {
    const {
      deletePages: { nodesDeleted },
    } = await pageApi.DeletePages({
      delete: Page.toDeleteInput(),
      where: { id_IN: pages.map((page) => page.id) },
    })

    return nodesDeleted
  }

  async find(where?: PageWhere, options?: PageOptions) {
    return pageApi.GetPages({ options, where })
  }

  async findOne(where: PageUniqueWhere) {
    return (await this.find(where)).items[0]
  }

  async update(page: IPageModel) {
    const {
      updatePages: { pages },
    } = await pageApi.UpdatePages({
      update: page.toUpdateInput(),
      where: { id: page.id },
    })

    const updatedPage = pages[0]

    assertIsDefined(updatedPage)

    return updatedPage
  }
}
