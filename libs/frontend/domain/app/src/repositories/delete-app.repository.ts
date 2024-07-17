'use server'

import type {
  IAppModel,
  IAppRepository,
  IRepository,
} from '@codelab/frontend/abstract/domain'
import {
  type DeleteAppsMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { App } from '../store'

const DeleteAppsMutation = graphql(`
  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
    deleteApps(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteAppRepository: IAppRepository['delete'] = async (
  apps: Array<IAppModel>,
) => {
  const {
    deleteApps: { nodesDeleted },
  } = await gqlFetch(DeleteAppsMutation, {
    delete: App.toDeleteInput(),
    where: { id_IN: apps.map((app) => app.id) },
  })

  return nodesDeleted
}
