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
import { refreshAppListAction } from '../app-list'
import { createAppAction } from './create-app.action'

export const createAppUseCase = async (
  appDto: IAppDto,
  appDomainService: IAppDomainService,
) => {
  const appModel = appDomainService.create(appDto)

  await createAppAction(appModel.toCreateInput())

  await refreshAppListAction()
}
