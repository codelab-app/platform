import type {
  IElementDto,
  IElementRenderTypeDto,
  IInterfaceTypeDto,
  IPageCreateFormData,
  IPropDto,
  IRef,
  IStoreDto,
  IUserDto,
} from '@codelab/shared/abstract/core'

import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import { IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { Validator } from '@codelab/shared/infra/schema'
import { slugify } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const createPageFactory = async (
  data: IPageCreateFormData,
  defaultRenderType: IElementRenderTypeDto,
  owner: IRef,
) => {
  const { app, id, name, urlPattern } = data

  const rootElementProps: IPropDto = {
    data: '{}',
    id: v4(),
  }

  const rootElement: IElementDto = {
    closestContainerNode: {
      id,
    },
    id: v4(),
    name: ROOT_ELEMENT_NAME,
    page: { id },
    props: rootElementProps,
    renderType: defaultRenderType,
  }

  const storeApi: IInterfaceTypeDto = {
    __typename: ITypeKind.InterfaceType,
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: InterfaceType.createName(`${name} Store`),
    owner,
  }

  const store: IStoreDto = {
    api: { id: storeApi.id },
    id: v4(),
    name: Store.createName({ name }),
  }

  const page = {
    app,
    id,
    kind: IPageKind.Regular,
    name,
    rootElement: { id: rootElement.id },
    store,
    // for new pages we allow user to omit url, in this case we autogenerate it
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    urlPattern: urlPattern ?? `/${slugify(name)}`,
  }

  return {
    page,
    rootElement,
    rootElementProps,
    store,
    storeApi,
  }
}
