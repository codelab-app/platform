import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { restWebClient } from '@codelab/frontend-infra-axios'
import type { IApp, IAppAggregate } from '@codelab/shared/abstract/core'
import { useCallback } from 'react'

export const useExportApp = (app: IAppModel) => {
  return useCallback(async () => {
    const res = await restWebClient.get<Promise<IAppAggregate>>(
      `app/export?id=${app.id}`,
    )

    downloadJsonAsFile(`${app.slug}.json`, res.data)

    return res
  }, [app.id, app.slug])
}
