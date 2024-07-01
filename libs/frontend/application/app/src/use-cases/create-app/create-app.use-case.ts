import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import {
  createAppAction,
  refreshAppListAction,
} from '@codelab/frontend-domain-app/actions'
import type { IAppDto } from '@codelab/shared/abstract/core'

export const createAppUseCase = async (
  appDto: IAppDto,
  { appDomainService, userDomainService }: IDomainStore,
) => {
  const appModel = appDomainService.create({
    id: appDto.id,
    name: appDto.name,
    owner: userDomainService.user,
  })

  await createAppAction(appModel.toCreateInput())

  await refreshAppListAction()
}
