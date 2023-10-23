import { Store } from '@codelab/frontend/domain/store'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { factoryBuild } from '../factory'

interface SetupOptions {
  actions?: Array<IEntity>
  postRenderAction?: IEntity
  preRenderAction?: IEntity
  storeId?: string
}

export const setupPage = (options: SetupOptions = {}) => {
  const { actions, postRenderAction, preRenderAction, storeId } = options
  const pageId = 'page-id'
  const pageName = 'Page'
  const pageStoreId = 'page-store-id'
  const pageRootElementId = 'page-root-element-id'

  const page = factoryBuild('page', {
    id: pageId,
    name: pageName,
    rootElement: { id: pageRootElementId },
    store: factoryBuild('store', {
      actions,
      api: factoryBuild('typeInterface'),
      id: storeId ?? pageStoreId,
      name: Store.createName({ name: pageName }),
      page: { id: pageId },
    }),
  })

  const rootElement = factoryBuild('element', {
    closestContainerNode: page,
    id: pageRootElementId,
    name: ROOT_ELEMENT_NAME,
    page,
    postRenderAction,
    preRenderAction,
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
