import { appFactory } from '@codelab/frontend/domain/app'
import { atomFactory } from '@codelab/frontend/domain/atom'
import { componentFactory } from '@codelab/frontend/domain/component'
import { elementFactory } from '@codelab/frontend/domain/element'
import { pageFactory } from '@codelab/frontend/domain/page'
import { Store, storeFactory } from '@codelab/frontend/domain/store'
import { interfaceTypeFactory } from '@codelab/frontend/domain/type'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { rootApplicationStore } from './root.test.store'

export const setupPage = () => {
  const {
    appService,
    atomService,
    elementService,
    pageService,
    storeService,
    typeService,
  } = rootApplicationStore

  const pageId = 'page-id'
  const pageName = 'Page Name'

  atomFactory(atomService.atomDomainService)({
    type: IAtomType.ReactFragment,
  })

  const HtmlDivAtom = atomFactory(atomService.atomDomainService)({
    type: IAtomType.HtmlDiv,
  })

  const app = appFactory(appService.appDomainService)({})

  const page = pageFactory(pageService.pageDomainService)({
    app,
    id: pageId,
    name: pageName,
    rootElement: elementFactory(elementService.elementDomainService)({
      closestContainerNode: { id: pageId },
      name: ROOT_ELEMENT_NAME,
      page: { id: pageId },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: HtmlDivAtom.id,
      },
    }),
    store: storeFactory(storeService.storeDomainService)({
      api: interfaceTypeFactory(typeService.typeDomainService)({}),
      name: Store.createName({ name: pageName }),
      page: { id: pageId },
    }),
  })

  return {
    app,
    page,
  }
}

export const setupComponent = () => {
  const {
    atomService,
    componentService,
    elementService,
    storeService,
    typeService,
  } = rootApplicationStore

  const { componentDomainService } = componentService
  const componentId = 'componentId'
  const componentName = 'Component Name'

  const HtmlDivAtom = atomFactory(atomService.atomDomainService)({
    type: IAtomType.HtmlDiv,
  })

  const component = componentFactory(componentDomainService)({
    api: interfaceTypeFactory(typeService.typeDomainService)({}),
    id: componentId,
    name: componentName,
    rootElement: elementFactory(elementService.elementDomainService)({
      closestContainerNode: { id: componentId },
      name: ROOT_ELEMENT_NAME,
      parentComponent: { id: componentId },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: HtmlDivAtom.id,
      },
    }),
    store: storeFactory(storeService.storeDomainService)({
      api: interfaceTypeFactory(typeService.typeDomainService)({}),
      component: { id: componentId },
      name: Store.createName({ name: componentName }),
    }),
  })

  return { component }
}
