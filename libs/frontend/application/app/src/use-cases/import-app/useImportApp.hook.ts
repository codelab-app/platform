import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { useCallback } from 'react'

import { importAppService } from './import-app.service'

export const useImportApp = () => {
  const { setLoading } = useLoading()

  const importApp = useCallback(
    async (appData: File) => {
      setLoading(true)

      try {
        const formData = new FormData()

        formData.append('file', appData)

        const importResult = await importAppService(formData)

        console.log(importResult)

        return importResult
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
