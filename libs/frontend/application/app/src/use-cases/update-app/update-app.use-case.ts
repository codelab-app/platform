import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { invalidateAppListQuery } from '../app-list'
import { updateAppRepository } from './update-app.repository'

export const updateAppUseCase = async (app: IAppModel, update: IAppDto) => {
  app.writeCache(update)

  await updateAppRepository({
    update: app.toUpdateInput(),
    where: { id: app.id },
  })

  await invalidateAppListQuery()
}
