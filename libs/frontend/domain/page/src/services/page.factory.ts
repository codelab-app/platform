import type { IApp, IPage, IPageFactory } from '@codelab/frontend/abstract/core'
import {
  APP_PAGE_NAME,
  DEFAULT_GET_SERVER_SIDE_PROPS,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPropService, Prop } from '@codelab/frontend/domain/prop'
import { getElementService } from '@codelab/frontend/presenter/container'
import { IPageKind } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { createUniqueName } from '@codelab/shared/utils'
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
  get propService() {
    return getPropService(this)
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  @modelAction
  addSystemPages(app: Pick<IApp, 'id' | 'owner'>) {
    return [
      this.addProviderPage(app),
      this.addNotFoundPage(app),
      this.addInternalServerErrorPage(app),
    ]
  }

  @modelAction
  private addProviderPage({ owner, ...app }: Pick<IApp, 'id' | 'owner'>) {
    return this.addDefaultPage({
      owner,
      app,
      kind: IPageKind.Provider,
    })
  }

  @modelAction
  private addNotFoundPage({ owner, ...app }: Pick<IApp, 'id' | 'owner'>) {
    return this.addDefaultPage({
      owner,
      app,
      kind: IPageKind.NotFound,
    })
  }

  @modelAction
  private addInternalServerErrorPage({
    owner,
    ...app
  }: Pick<IApp, 'id' | 'owner'>) {
    return this.addDefaultPage({
      owner,
      app,
      kind: IPageKind.InternalServerError,
    })
  }

  @modelAction
  private addDefaultPage({
    owner,
    kind,
    app,
  }: Pick<IPage, 'app' | 'owner' | 'kind'>) {
    const rootElementProps = this.propService.add({
      id: v4(),
      data: '',
    })

    const rootElement = this.elementService.add({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: rootElementProps,
    })

    return this.pageService.add({
      id: v4(),
      name: APP_PAGE_NAME,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      app,
      rootElement,
      kind,
      owner,
    })
  }
}
