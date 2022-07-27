import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { IAppDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { print } from 'graphql'
import { v4 } from 'uuid'
import { CreateAppsDocument } from '../../../../../libs/frontend/modules/app/src/graphql/app.endpoints.graphql.gen'

const createDefaultInput = (userId: string): AppCreateInput => {
  const appId = v4()

  return {
    id: appId,
    name: `Test app ${v4()}`,
    rootElement: {
      create: { node: { name: PROVIDER_ROOT_ELEMENT_NAME, id: v4() } },
    },
    owner: connectOwner(userId),
    store: {
      create: {
        node: {
          id: v4(),
          name: `Test Store ${appId}`,
          actions: {},
          state: { create: { node: { data: '{}' } } },
          stateApi: {
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
      variables: { input: input || createDefaultInput(userId) },
    })
    .then((result) => result.body.data?.createApps.apps as Array<IAppDTO>)
