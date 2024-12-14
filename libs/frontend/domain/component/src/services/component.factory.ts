import type {
  IComponentDto,
  ICreateComponentData,
  IElementDto,
  IElementRenderTypeDto,
  IInterfaceTypeDto,
  IPropDto,
  IStoreDto,
} from '@codelab/shared/abstract/core'

import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const componentFactory = (
  componentData: ICreateComponentData,
  defaultRenderType: IElementRenderTypeDto,
) => {
  const { id, name, owner, rootElement } = componentData

  const storeApi: IInterfaceTypeDto = {
    __typename: ITypeKind.InterfaceType,
    fields: [],
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: InterfaceType.createName(`${name} Store`),
    owner,
  }

  const store: IStoreDto = {
    api: storeApi,
    id: v4(),
    name: Store.createName({ name }),
  }

  const api: IInterfaceTypeDto = {
    __typename: ITypeKind.InterfaceType,
    fields: [],
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: InterfaceType.createName(name),
    owner,
  }

  const componentProps: IPropDto = {
    data: '{}',
    id: v4(),
  }

  /**
   * create rootElement in case it doesn't already exist
   * Unlike other models such rootElement could exist before component (convertElementToComponent)
   * connectOrCreate can't handle sub-models like props for element
   * the only choice left is to create rootElement here if it is not provided
   * */
  const rootElementDto: IElementDto = {
    closestContainerNode: {
      id,
    },
    id: rootElement ? rootElement.id : v4(),
    // we don't append 'Root' here to include the case of existing element
    name: `${name} Root`,
    parentComponent: { id },
    props: {
      data: '{}',
      id: v4(),
    },
    renderType: {
      __typename: IElementRenderTypeKind.Atom,
      id: defaultRenderType.id,
    },
  }

  const component: IComponentDto = {
    ...componentData,
    __typename: IElementRenderTypeKind.Component,
    api,
    props: componentProps,
    rootElement: rootElementDto,
    store,
  }

  return {
    component: {
      api,
      component,
      props: componentProps,
      rootElement: rootElementDto,
      store,
    },
    storeApi,
  }
}
