import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { type FragmentType, useFragment } from '@codelab/frontend/infra/gql'
import { restWebClient } from '@codelab/frontend-infra-axios'
import type { IAppAggregate } from '@codelab/shared/abstract/core'
import { prettifyForConsole } from '@codelab/shared/utils'
import { useCallback } from 'react'
import {
  type AppListItem_AppFragment,
  AppListItem_appFragment,
} from '../app-list/AppListItem'

export const useExportApp = (app: AppListItem_AppFragment) => {
  const data = useFragment(AppListItem_appFragment, app)

  return useCallback(async () => {
    const res = await restWebClient.get<Promise<IAppAggregate>>(
      `app/export?id=${data.id}`,
    )

    const filename = `${data.slug}.json`
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
  }, [data.id, data.slug])
}
