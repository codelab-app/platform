import type { IPageFactory } from '@codelab/frontend/abstract/core'
import {
  APP_PAGE_NAME,
  DEFAULT_GET_SERVER_SIDE_PROPS,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { Element, elementRef } from '@codelab/frontend/domain/element'
import { getElementService } from '@codelab/frontend/presenter/container'
import { IPageKind } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { DataModel, Model, model, modelAction } from 'mobx-keystone'
import { v4 } from 'uuid'
import slugify from 'voca/slugify'
import { getPageService, Page } from '../store'

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
  createProviderPage(app: IEntity) {
    const providerPageId = v4()

    const rootElement = this.elementService.add({
      name: slugify(`${providerPageId}-${ROOT_ELEMENT_NAME}`),
    })

    return this.pageService.add({
      id: providerPageId,
      name: APP_PAGE_NAME,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      appId: app.id,
      rootElementId: rootElement.id,
      kind: IPageKind.Provider,
    })
  }

  @modelAction
  createNotFoundPage(app: IEntity) {
    const notFoundPageId = v4()

    const rootElement = this.elementService.add({
      name: slugify(`${notFoundPageId}-${ROOT_ELEMENT_NAME}`),
    })

    return this.pageService.add({
      id: notFoundPageId,
      name: NOT_FOUND_PAGE_NAME,
      // name: slugify(`${app.id}-${NOT_FOUND_PAGE_NAME}`),
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      appId: app.id,
      rootElementId: rootElement.id,
      kind: IPageKind.NotFound,
    })
  }

  @modelAction
  createInternalServerErrorPage(app: IEntity) {
    const internalServerErrorPageId = v4()

    const rootElement = this.elementService.add({
      name: slugify(`${internalServerErrorPageId}-${ROOT_ELEMENT_NAME}`),
    })

    return this.pageService.add({
      id: internalServerErrorPageId,
      name: INTERNAL_SERVER_ERROR_PAGE_NAME,
      // name: slugify(`${app.id}-${NOT_FOUND_PAGE_NAME}`),
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      appId: app.id,
      rootElementId: rootElement.id,
      kind: IPageKind.InternalServerError,
    })
  }
}
