import { toElementCreateInput } from '@codelab/frontend-application-element/use-cases/create-element'
import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import type { PageCreateInput } from '@codelab/shared/abstract/codegen'
import type { ICreatePageData, IRef } from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IPageKind,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { connectOwner, PageProperties } from '@codelab/shared/domain'
import { v4 } from 'uuid'

export const systemPagesInput = (
  app: IRef,
  uniqueAppName: string,
  owner: IRef,
) => [
  {
    node: toPageCreateInput(
      {
        app,
        id: v4(),
        kind: IPageKind.Provider,
        name: IPageKindName.Provider,
        urlPattern: `/${IPageKindName.Provider}`,
      },
      uniqueAppName,
      owner,
    ),
  },
  {
    node: toPageCreateInput(
      {
        app,
        id: v4(),
        kind: IPageKind.NotFound,
        name: IPageKindName.NotFound,
        urlPattern: `/${IPageKindName.NotFound}`,
      },
      uniqueAppName,
      owner,
    ),
  },
  {
    node: toPageCreateInput(
      {
        app,
        id: v4(),
        kind: IPageKind.InternalServerError,
        name: IPageKindName.InternalServerError,
        urlPattern: `/${IPageKindName.InternalServerError}`,
      },
      uniqueAppName,
      owner,
    ),
  },
]

export const toPageCreateInput = (
  { app, id, kind, name, urlPattern }: ICreatePageData,
  uniqueAppName: string,
  owner: IRef,
): PageCreateInput => ({
  compositeKey: PageProperties.pageCompositeKey(name, app),
  id,
  kind,
  rootElement: {
    create: {
      node: toElementCreateInput(
        {
          atom: IAtomType.ReactFragment,
          id: v4(),
          name: ROOT_ELEMENT_NAME,
        },
        { id },
      ),
    },
  },
  store: {
    create: {
      node: {
        api: {
          create: {
            node: {
              id: v4(),
              kind: ITypeKind.InterfaceType,
              name: InterfaceType.createName(`${uniqueAppName} ${name} Store`),
              owner: connectOwner(owner),
            },
          },
        },
        id: v4(),
        name: Store.createName({ name }),
      },
    },
  },
  urlPattern,
})
