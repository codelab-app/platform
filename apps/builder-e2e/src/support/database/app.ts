import type { IAppDTO } from '@codelab/frontend/abstract/core'
import {
  APP_PAGE_NAME,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
} from '@codelab/frontend/abstract/core'
import { createUniqueName } from '@codelab/frontend/shared/utils'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { print } from 'graphql'
import { CreateAppsDocument } from 'libs/frontend/domain/app/src/graphql/app.endpoints.graphql.gen'
import { v4 } from 'uuid'
import { createPageInput } from './page'

export const createAppInput = (userId: string): AppCreateInput => {
  const appId = v4()

  return {
    id: appId,
    name: `Test app ${appId}`,
    owner: connectAuth0Owner(userId),
    pages: {
      create: [
        // create provider page
        {
          node: createPageInput(appId, {
            name: createUniqueName(APP_PAGE_NAME, appId),
            kind: IPageKind.Provider,
          }),
        },
        {
          node: createPageInput(appId, {
            name: createUniqueName(NOT_FOUND_PAGE_NAME, appId),
            kind: IPageKind.NotFound,
          }),
        },
        {
          node: createPageInput(appId, {
            name: createUniqueName(INTERNAL_SERVER_ERROR_PAGE_NAME, appId),
            kind: IPageKind.InternalServerError,
          }),
        },
        // create test page
        { node: createPageInput(appId) },
      ],
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
                owner: connectAuth0Owner(userId),
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

export const createApp = (input: AppCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateAppsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createApps.apps as Array<IAppDTO>)
