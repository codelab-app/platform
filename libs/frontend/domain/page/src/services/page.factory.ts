import type { IApp, IPage, IPageFactory } from '@codelab/frontend/abstract/core'
import {
  getElementService,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
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
  addSystemPages(app: Pick<IApp, 'id'>) {
    return [
      this.addProviderPage(app),
      this.addNotFoundPage(app),
      this.addInternalServerErrorPage(app),
    ]
  }

  @modelAction
  private addProviderPage(app: Pick<IApp, 'id'>) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.Provider,
      name: IPageKindName.Provider,
    })
  }

  @modelAction
  private addNotFoundPage(app: Pick<IApp, 'id'>) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.NotFound,
      name: IPageKindName.NotFound,
    })
  }

  @modelAction
  private addInternalServerErrorPage(app: Pick<IApp, 'id'>) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.InternalServerError,
      name: IPageKindName.InternalServerError,
    })
  }

  @modelAction
  private addDefaultPage({
    app,
    kind,
    name,
  }: Pick<IPage, 'app' | 'kind' | 'name'>) {
    const rootElementProps = this.propService.add({
      id: v4(),
    })

    const rootElement = this.elementService.add({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: rootElementProps,
    })

    const pageContentContainer =
      kind === IPageKind.Provider ? { id: rootElement.id } : null

    return this.pageService.add({
      app,
      id: v4(),
      kind,
      name,
      pageContentContainer,
      rootElement,
    })
  }
}
