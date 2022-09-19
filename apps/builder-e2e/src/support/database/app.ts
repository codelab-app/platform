import { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { IAppDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { connectOwner, connectTypeOwner } from '@codelab/shared/data'
import { print } from 'graphql'
import { v4 } from 'uuid'
import { CreateAppsDocument } from '../../../../../libs/frontend/modules/app/src/graphql/app.endpoints.graphql.gen'

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
