import type { IAppDto } from '@codelab/shared-abstract-core'

import { useLoading } from '@codelab/frontend-application-shared-services/loading'
import { invalidateAppListQuery } from '@codelab/frontend-domain-app/repositories'
import { jobSubscription } from '@codelab/frontend-infra-ws'
import { getEnv } from '@codelab/shared-config-env'
import { useCallback } from 'react'

import { queueImportAppAction } from './import-app.service'

export const useImportApp = () => {
  const { setLoading } = useLoading()

  const importApp = useCallback(
    async (appData: File) => {
      setLoading(true)

      try {
        const formData = new FormData()

        formData.append('file', appData)

        const { jobId } = await queueImportAppAction(formData)

        const { data } = await jobSubscription<IAppDto>(jobId, {
          socketEndpoint: `${getEnv().endpoint.apiHost}`,
        })

        await invalidateAppListQuery()

        return data
      } catch (error: unknown) {
        console.log(error)

        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading],
  )

  return importApp
}
