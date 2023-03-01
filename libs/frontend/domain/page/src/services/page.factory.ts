import type { IPageFactory } from '@codelab/frontend/abstract/core'
import {
  APP_PAGE_NAME,
  DEFAULT_GET_SERVER_SIDE_PROPS,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/presenter/container'
import { createUniqueName } from '@codelab/frontend/shared/utils'
import { IPageKind } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { Model, model, modelAction } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getPageService } from '../store'

@model('@codelab/PageFactory')
export class PageFactory extends Model({}) implements IPageFactory {
  @computed
  get pageService() {
    return getPageService(this)
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  @modelAction
  addSystemPages(app: IEntity) {
    return [
      this.addProviderPage(app),
      this.addNotFoundPage(app),
      this.addInternalServerErrorPage(app),
    ]
  }

  @modelAction
  private addProviderPage(app: IEntity) {
    const providerPageId = v4()

    const rootElement = this.elementService.add({
      id: v4(),
      name: createUniqueName(ROOT_ELEMENT_NAME, { id: providerPageId }),
    })

    return this.pageService.add({
      id: providerPageId,
      name: APP_PAGE_NAME,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      app,
      rootElement,
      kind: IPageKind.Provider,
    })
  }

  @modelAction
  private addNotFoundPage(app: IEntity) {
    const notFoundPageId = v4()

    const rootElement = this.elementService.add({
      id: v4(),
      name: createUniqueName(ROOT_ELEMENT_NAME, { id: notFoundPageId }),
    })

    return this.pageService.add({
      id: notFoundPageId,
      name: NOT_FOUND_PAGE_NAME,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      app,
      rootElement,
      kind: IPageKind.NotFound,
    })
  }

  @modelAction
  private addInternalServerErrorPage(app: IEntity) {
    const internalServerErrorPageId = v4()

    const rootElement = this.elementService.add({
      id: v4(),
      name: createUniqueName(ROOT_ELEMENT_NAME, {
        id: internalServerErrorPageId,
      }),
    })

    return this.pageService.add({
      id: internalServerErrorPageId,
      name: INTERNAL_SERVER_ERROR_PAGE_NAME,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      app,
      rootElement,
      kind: IPageKind.InternalServerError,
    })
  }
}
