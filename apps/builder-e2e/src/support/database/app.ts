import type { IAppDTO } from '@codelab/frontend/abstract/core'
import {
  APP_PAGE_NAME,
  APP_PAGE_SLUG,
  DEFAULT_GET_SERVER_SIDE_PROPS,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { print } from 'graphql'
import { CreateAppsDocument } from 'libs/frontend/domain/app/src/graphql/app.endpoints.graphql.gen'
import { v4 } from 'uuid'

export const createAppInput = (userId: string): AppCreateInput => {
  const appId = v4()
  const pageId = v4()
  const rootId = v4()

  const providerPage = {
    id: pageId,
    name: APP_PAGE_NAME,
    slug: `${appId}-${APP_PAGE_SLUG}`,
    getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
    app: {
      connect: { where: { node: { id: appId } } },
    },
    rootElement: {
      create: {
        node: {
          id: rootId,
          name: ROOT_ELEMENT_NAME,
          slug: createSlug(ROOT_ELEMENT_NAME, pageId),
        },
      },
    },
    isProvider: true,
    pageContainerElement: {
      connect: { where: { node: { id: rootId } } },
    },
  }

  return {
    id: appId,
    name: `Test app ${appId}`,
    slug: `test-${appId}`,
    owner: connectOwner(userId),
    pages: {
      create: [{ node: providerPage }],
    },
    store: {
      create: {
        node: {
          id: v4(),
          name: `Test Store ${appId}`,
          actions: {},
          api: {
            create: {
              node: {
                id: v4(),
                owner: connectOwner(userId),
                name: `Test Store ${appId} API`,
                fields: {},
                apiOfAtoms: {},
                kind: ITypeKind.InterfaceType,
              },
            },
          },
        },
      },
    },
  }
}

export const createApp = (userId: string, input?: AppCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateAppsDocument),
      variables: { input: input || createAppInput(userId) },
    })
    .then((result) => result.body.data?.createApps.apps as Array<IAppDTO>)
