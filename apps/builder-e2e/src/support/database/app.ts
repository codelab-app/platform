import type { IAppDTO } from '@codelab/frontend/abstract/core'
import {
  APP_PAGE_NAME,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
} from '@codelab/frontend/abstract/core'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
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
            kind: IPageKind.Provider,
            name: createUniqueName(APP_PAGE_NAME, appId),
          }),
        },
        {
          node: createPageInput(appId, {
            kind: IPageKind.NotFound,
            name: createUniqueName(NOT_FOUND_PAGE_NAME, appId),
          }),
        },
        {
          node: createPageInput(appId, {
            kind: IPageKind.InternalServerError,
            name: createUniqueName(INTERNAL_SERVER_ERROR_PAGE_NAME, appId),
          }),
        },
        // create test page
        { node: createPageInput(appId) },
      ],
    },
    store: {
      create: {
        node: {
          actions: {},
          api: {
            create: {
              node: {
                apiOfAtoms: {},
                fields: {},
                id: v4(),
                kind: ITypeKind.InterfaceType,
                name: `Test Store ${appId} API`,
                owner: connectAuth0Owner(userId),
              },
            },
          },
          id: v4(),
          name: `Test Store ${appId}`,
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
