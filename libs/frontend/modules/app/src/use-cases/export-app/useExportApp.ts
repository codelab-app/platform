import { notify } from '@codelab/frontend/shared/utils'
import fileDownload from 'js-file-download'
import { useCallback, useEffect, useState } from 'react'
import sanitizeFilename from 'sanitize-filename'
import { AppFragment } from '../../graphql/App.fragment.graphql.gen'
import { useLazyExportAppQuery } from '../../store'

export const useExportApp = (app: AppFragment) => {
  const [hasExported, setHasExported] = useState(false)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
