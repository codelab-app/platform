import { restWebClient } from '@codelab/frontend-infra-axios'
import type { IApp, IAppAggregate } from '@codelab/shared/abstract/core'
import { prettifyForConsole } from '@codelab/shared/utils'
import { useCallback } from 'react'

export const useExportApp = (app: IApp) => {
  return useCallback(async () => {
    const res = await restWebClient.get<Promise<IAppAggregate>>(
      `app/export?id=${app.id}`,
    )

    const filename = `${app.slug}.json`
    const contentType = 'application/json;charset=utf-8;'
    const a = document.createElement('a')

    a.download = filename
    a.href = `data:${contentType},${encodeURIComponent(
      prettifyForConsole(res.data),
    )}`
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    return res
  }, [app.id, app.slug])
}
