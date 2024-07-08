import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { exportAppAction } from './export-app.action'

export const useExportApp = (app: IAppModel) => {
  return useCallback(async () => {
    const data = await exportAppAction(app.id)

    downloadJsonAsFile(`${app.slug}.json`, data)

    return data
  }, [app.id, app.slug])
}
