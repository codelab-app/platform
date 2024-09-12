'use client'

import { UiDataRecord } from '@codelab/frontend/abstract/types'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import LinearProgress from '@mui/material/LinearProgress'

export const ProgressBar = () => {
  const { isLoading } = useLoading()

  return (
    <div className="h-1">
      {isLoading ? (
        <LinearProgress
          aria-label={UiDataRecord.GlobalProgressBar.label}
          className="h-full"
        />
      ) : null}
    </div>
  )
}
