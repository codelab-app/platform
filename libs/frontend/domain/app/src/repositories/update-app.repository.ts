'use server'

import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import {
  graphql,
  type UpdateAppsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { assertIsDefined } from '@codelab/shared/utils'

const UpdateAppsDocument = graphql(`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(update: $update, where: $where) {
      apps {
        id
      }
    }
  }
`)

export const updateAppRepository: IAppRepository['update'] = async (
  app: IAppModel,
) => {
  const {
    updateApps: { apps },
  } = await gqlFetch(UpdateAppsDocument, {
    update: app.toUpdateInput(),
    where: { id: app.id },
  })

  assertIsDefined(apps[0])

  return apps[0]
}
