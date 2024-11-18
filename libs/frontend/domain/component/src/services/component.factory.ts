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

const storeFactory = ({ name, owner }: ICreateComponentData) => {
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

  return { store, storeApi }
}

const apiFactory = ({
  name,
  owner,
}: ICreateComponentData): IInterfaceTypeDto => ({
  __typename: ITypeKind.InterfaceType,
  fields: [],
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: InterfaceType.createName(name),
  owner,
})

export const componentFactory = (
  componentData: ICreateComponentData,
  defaultRenderType: IElementRenderTypeDto,
) => {
  const { id, name } = componentData
  const api = apiFactory(componentData)
  const { store, storeApi } = storeFactory(componentData)

  const componentProps: IPropDto = {
    data: '{}',
    id: v4(),
  }

  const rootElementDto: IElementDto = {
    closestContainerNode: {
      id,
    },
    id: v4(),
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

export const componentWithoutRootFactory = (
  componentData: ICreateComponentData,
  rootElement: IRef,
) => {
  const { id } = componentData

  const props: IPropDto = {
    data: '{}',
    id: v4(),
  }

  const api = apiFactory(componentData)
  const { store, storeApi } = storeFactory(componentData)

  const component: IComponentDto = {
    ...componentData,
    __typename: IElementRenderTypeKind.Component,
    api,
    id,
    props,
    rootElement,
    store,
  }

  return {
    component: {
      api,
      component,
      props,
      store,
    },
    storeApi,
  }
}
