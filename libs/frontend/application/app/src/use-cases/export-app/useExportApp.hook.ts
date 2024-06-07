import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { restWebClient } from '@codelab/frontend-infra-axios'
import type { IAppAggregate } from '@codelab/shared/abstract/core'
import { prettifyForConsole } from '@codelab/shared/utils'

export const useExportApp = async (app: IAppModel) => {
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
}
