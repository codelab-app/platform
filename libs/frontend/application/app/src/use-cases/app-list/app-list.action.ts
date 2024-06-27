'use server'

import type { GetAppsListQueryVariables } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { GetAppsListQuery } from './app-list.query'

export const appListAction = async ({
  options,
  where,
}: GetAppsListQueryVariables): Promise<Array<IAppDto>> => {
  const { apps } = await execute(GetAppsListQuery, {
    options,
    where,
  })

  return apps
}
