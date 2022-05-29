import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { IAppDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { v4 } from 'uuid'
import { CreateAppsDocument } from '../../../../../libs/frontend/modules/app/src/graphql/app.endpoints.graphql.gen'

const defaultInput: AppCreateInput = {
  id: v4(),
  name: 'Test app',
  rootElement: {
    create: { node: { name: PROVIDER_ROOT_ELEMENT_NAME, id: v4() } },
  },
  store: {
    create: {
      node: {
        id: v4(),
        name: 'Test Store',
        actions: {},
        app: {},
        state: { create: { node: { data: '{}' } } },
        stateApi: {
          create: {
            node: {
              id: v4(),
              name: 'Test Store API',
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

export const createApp = (input: AppCreateInput = defaultInput) =>
  cy
    .graphqlRequest({
      query: print(CreateAppsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createApps.apps as Array<IAppDTO>)
