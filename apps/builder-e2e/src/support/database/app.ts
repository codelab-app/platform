import type { IAppDTO } from '@codelab/frontend/abstract/core'
import { APP_PAGE_NAME, APP_PAGE_SLUG } from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { print } from 'graphql'
import { CreateAppsDocument } from 'libs/frontend/domain/app/src/graphql/app.endpoints.graphql.gen'
import { v4 } from 'uuid'
import { createPageInput } from './page'

export const createAppInput = (userId: string): AppCreateInput => {
  const appId = v4()

  return {
    id: appId,
    name: `Test app ${appId}`,
    slug: `test-${appId}`,
    owner: connectOwner(userId),
    pages: {
      create: [
        // create provider page
        {
          node: createPageInput(appId, {
            name: APP_PAGE_NAME,
            slug: createSlug(APP_PAGE_SLUG, appId),
            isProvider: true,
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

export const createApp = (input: AppCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateAppsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createApps.apps as Array<IAppDTO>)
