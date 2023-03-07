import type { IAppDTO, IAuth0Owner } from '@codelab/frontend/abstract/core'
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

export const createAppInput = (owner: IAuth0Owner): AppCreateInput => {
  const appId = v4()

  return {
    _compoundName: createUniqueName(`Test app ${appId}`, owner.auth0Id),
    id: appId,
    owner: connectAuth0Owner(owner),
    pages: {
      create: [
        // create provider page
        {
          node: createPageInput(appId, {
            _compoundName: createUniqueName(APP_PAGE_NAME, appId),
            kind: IPageKind.Provider,
          }),
        },
        {
          node: createPageInput(appId, {
            _compoundName: createUniqueName(NOT_FOUND_PAGE_NAME, appId),
            kind: IPageKind.NotFound,
          }),
        },
        {
          node: createPageInput(appId, {
            _compoundName: createUniqueName(
              INTERNAL_SERVER_ERROR_PAGE_NAME,
              appId,
            ),
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
          actions: {},
          api: {
            create: {
              node: {
                apiOfAtoms: {},
                fields: {},
                id: v4(),
                kind: ITypeKind.InterfaceType,
                name: `Test Store ${appId} API`,
                owner: connectAuth0Owner(owner),
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
