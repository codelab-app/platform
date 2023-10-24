import { Store } from '@codelab/frontend/domain/store'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { dtoFactory } from './dto.factory'

export const setupPage = () => {
  const appId = 'app-id'
  const pageId = 'page-id'
  const pageName = 'Page'
  const pageStoreId = 'page-store-id'
  const pageRootElementId = 'page-root-element-id'

  const app = dtoFactory.build('app', {
    id: appId,
  })

  const page = dtoFactory.build('page', {
    app,
    id: pageId,
    name: pageName,
    rootElement: { id: pageRootElementId },
    store: dtoFactory.build('store', {
      api: dtoFactory.build('interfaceType'),
      id: pageStoreId,
      name: Store.createName({ name: pageName }),
      page: { id: pageId },
    }),
  })

  const atom = dtoFactory.build('atom', {
    api: dtoFactory.build('interfaceType'),
    type: IAtomType.HtmlDiv,
  })

  const props = dtoFactory.build('props').toJson

  const rootElement = dtoFactory.build('element', {
    closestContainerNode: page,
    id: pageRootElementId,
    name: ROOT_ELEMENT_NAME,
    page,
    props,
    renderType: atom,
  })

  return {
    app,
    page,
    rootElement,
  }
}
