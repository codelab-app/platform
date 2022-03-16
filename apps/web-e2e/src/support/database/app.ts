import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AppCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { IApp } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { E2eCreateAppDocument } from './graphql/app.api.v2.1.graphql.gen'

const defaultInput: AppCreateInput = {
  name: 'Test app',
  rootProviderElement: {
    create: { node: { name: PROVIDER_ROOT_ELEMENT_NAME } },
  },
}

export const createApp = (input: AppCreateInput = defaultInput) =>
  cy
    .graphqlRequest({
      query: print(E2eCreateAppDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createApps.apps as Array<IApp>)
