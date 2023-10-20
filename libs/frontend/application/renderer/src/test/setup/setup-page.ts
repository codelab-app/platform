import { Store } from '@codelab/frontend/domain/store'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { factoryBuild } from '../factory'

export const setupPage = () => {
  const pageId = 'page-id'
  const pageName = 'Page'
  const pageStoreId = 'page-store-id'
  const pageRootElementId = 'page-root-element-id'

  const page = factoryBuild('page', {
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
    page,
    rootElement,
  }
}
