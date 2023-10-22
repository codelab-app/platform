import { Store } from '@codelab/frontend/domain/store'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { FactoryDto } from '@codelab/shared/data/test'

export const setupPage = () => {
  const appId = 'app-id'
  const pageId = 'page-id'
  const pageName = 'Page'
  const pageStoreId = 'page-store-id'
  const pageRootElementId = 'page-root-element-id'

  const app = factoryBuild('app', {
    id: appId,
  })

  const page = factoryBuild('page', {
    app: { id: appId },
    id: pageId,
    name: pageName,
    rootElement: { id: pageRootElementId },
    store: FactoryDto.build('store', {
      api: FactoryDto.build('typeInterface'),
      id: pageStoreId,
      name: Store.createName({ name: pageName }),
      page: { id: pageId },
    }),
  })

  const rootElement = FactoryDto.build('element', {
    closestContainerNode: page,
    id: pageRootElementId,
    name: ROOT_ELEMENT_NAME,
    page,
    props: FactoryDto.build('props'),
    renderType: FactoryDto.build('atom', {
      api: FactoryDto.build('typeInterface'),
      type: IAtomType.HtmlDiv,
    }),
  })

  return {
    app,
    page,
    rootElement,
  }
}
