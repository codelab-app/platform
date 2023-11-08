import { appFactory } from '@codelab/frontend/domain/app'
import { atomFactory } from '@codelab/frontend/domain/atom'
import { elementFactory } from '@codelab/frontend/domain/element'
import { pageFactory } from '@codelab/frontend/domain/page'
import { propFactory } from '@codelab/frontend/domain/prop'
import { Store, storeFactory } from '@codelab/frontend/domain/store'
import { interfaceTypeFactory } from '@codelab/frontend/domain/type'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { rootDomainStore } from './root.test.store'

export const setupPage = () => {
  const appId = 'app-id'
  const pageId = 'page-id'
  const pageName = 'Page'
  const pageStoreId = 'page-store-id'
  const pageRootElementId = 'page-root-element-id'

  const app = appFactory(rootDomainStore)({
    id: appId,
  })

  const page = pageFactory(rootDomainStore)({
    app,
    id: pageId,
    name: pageName,
    rootElement: { id: pageRootElementId },
    store: storeFactory(rootDomainStore)({
      api: interfaceTypeFactory(rootDomainStore)({}),
      id: pageStoreId,
      name: Store.createName({ name: pageName }),
      page: { id: pageId },
    }),
  })

  const atom = atomFactory(rootDomainStore)({
    api: interfaceTypeFactory(rootDomainStore)({}),
    type: IAtomType.HtmlDiv,
  })

  const props = propFactory(rootDomainStore)().toJson

  const rootElement = elementFactory(rootDomainStore)({
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
