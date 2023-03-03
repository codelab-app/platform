import type { IApp, IPage, IPageFactory } from '@codelab/frontend/abstract/core'
import {
  DEFAULT_GET_SERVER_SIDE_PROPS,
  getElementService,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { IPageKind } from '@codelab/shared/abstract/core'
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
    })
  }

  @modelAction
  private addNotFoundPage(app: Pick<IApp, 'id'>) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.NotFound,
    })
  }

  @modelAction
  private addInternalServerErrorPage(app: Pick<IApp, 'id'>) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.InternalServerError,
    })
  }

  @modelAction
  private addDefaultPage({ kind, app }: Pick<IPage, 'app' | 'kind'>) {
    const rootElementProps = this.propService.add({
      id: v4(),
    })

    const rootElement = this.elementService.add({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: rootElementProps,
    })

    return this.pageService.add({
      app,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      id: v4(),
      kind,
      name: kind,
      rootElement,
    })
  }
}
