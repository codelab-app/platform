import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { IAppDTO } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { CreateAppsDocument } from '../../../../../libs/frontend/modules/app/src/graphql/app.endpoints.graphql.gen'

const defaultInput: AppCreateInput = {
  name: 'Test app',
  rootProviderElement: {
    create: { node: { name: PROVIDER_ROOT_ELEMENT_NAME } },
  },
}

export const createApp = (input: AppCreateInput = defaultInput) =>
  cy
    .graphqlRequest({
      query: print(CreateAppsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createApps.apps as Array<IAppDTO>)
