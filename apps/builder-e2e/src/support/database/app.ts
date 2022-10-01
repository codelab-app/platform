import { IAppDTO, ITypeKind } from '@codelab/frontend/abstract/core'
import { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { connectOwner, connectTypeOwner } from '@codelab/shared/data'
import { print } from 'graphql'
import { CreateAppsDocument } from 'libs/frontend/domain/app/src/graphql/app.endpoints.graphql.gen'
import { v4 } from 'uuid'

export const createAppInput = (userId: string): AppCreateInput => {
  const appId = v4()

  return {
    id: appId,
    name: `Test app ${appId}`,
    slug: 'test',
    owner: connectOwner(userId),
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
                owner: connectTypeOwner(userId),
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
