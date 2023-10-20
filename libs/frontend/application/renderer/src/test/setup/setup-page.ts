import { Store } from '@codelab/frontend/domain/store'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { factoryBuild } from '../factory'

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
    store: factoryBuild('store', {
      api: factoryBuild('typeInterface'),
      id: pageStoreId,
      name: Store.createName({ name: pageName }),
      page: { id: pageId },
    }),
  })

  const rootElement = factoryBuild('element', {
    closestContainerNode: page,
    id: pageRootElementId,
    name: ROOT_ELEMENT_NAME,
    page,
    props: factoryBuild('props'),
    renderType: factoryBuild('atom', {
      api: factoryBuild('typeInterface'),
      type: IAtomType.HtmlDiv,
    }),
  })

  return {
    app,
    page,
    rootElement,
  }
}
