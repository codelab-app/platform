import type { IAppService } from '@codelab/frontend/abstract/application'
import type {
  IAppModel,
  IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import { invalidateAppListQuery } from '../app-list'
import { updateAppRepository } from './update-app.repository'

export const updateAppUseCase: IAppService['updateApp'] = async (
  app: IAppModel,
  update: IUpdateAppData,
) => {
  app.writeCache(update)

  await updateAppRepository({
    update: app.toUpdateInput(),
    where: { id: app.id },
  })

  await invalidateAppListQuery()
}
