'use server'

import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import { type AppCreateInput, graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { assertIsDefined } from '@codelab/shared/utils'

const CreateAppsDocument = graphql(`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        id
      }
    }
  }
`)

export const createAppRepository: IAppRepository['add'] = async (
  app: IAppModel,
) => {
  const {
    createApps: { apps },
  } = await gqlFetch(CreateAppsDocument, {
    input: app.toCreateInput(),
  })

  assertIsDefined(apps[0])

  return apps[0]
}
