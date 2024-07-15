import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { exportAppUseCase } from './export-app.use-case'

export const useExportApp = (app: IAppModel) => {
  const exportApp = async () => {
    const exportedApp = await exportAppUseCase({ id: app.id })

    downloadJsonAsFile(app.slug, exportedApp)
  }

  return { exportApp }
}
