import type {
  IAppDomainService,
  IDomainStore,
} from '@codelab/frontend/abstract/domain'
import {
  type AppCreateInput,
  execute,
  graphql,
} from '@codelab/frontend/infra/gql'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { invalidateAppListQuery } from '../app-list'
import { createAppRepository } from './create-app.repository'

export const createAppUseCase = async (
  appDto: IAppDto,
  appDomainService: IAppDomainService,
) => {
  const appModel = appDomainService.create(appDto)

  await createAppRepository(appModel.toCreateInput())

  await invalidateAppListQuery()
}
