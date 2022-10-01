import { AppFragment } from '@codelab/frontend/abstract/core'
import { notify } from '@codelab/frontend/shared/utils'
import fileDownload from 'js-file-download'
import { useCallback, useEffect, useState } from 'react'
import sanitizeFilename from 'sanitize-filename'

export const useExportApp = (app: AppFragment) => {
  const [hasExported, setHasExported] = useState(false)
  const useLazyExportAppQuery = (): any => null

  const [
    mutate,
    { isLoading: isExporting, data: exportData, error: exportError },
  ] = useLazyExportAppQuery()

  useEffect(() => {
    if (exportData && !hasExported) {
      fileDownload(
        exportData.exportApp.payload,
        sanitizeFilename(`${app.name}.codelab.json`),
      )
    }
  }, [exportData, hasExported])

  useEffect(() => {
    if (exportError) {
      notify({ type: 'error' }, exportError)
    }
  }, [exportError])

  const exportApp = useCallback(() => {
    setHasExported(false)

    return mutate({
      variables: {
        input: {
          appId: app.id,
        },
      },
    })
  }, [exportError, app.id])

  return {
    isExporting,
    exportApp,
  }
}
