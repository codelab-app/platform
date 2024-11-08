'use client'

import { getUiDataLabel, UiKey } from '@codelab/frontend/abstract/types'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
// import LinearProgress from '@mui/material/LinearProgress'

/**
 * Meant to be used as a global loading bar
 */
export const ProgressBar = () => {
  const { isLoading } = useLoading()
  const label = getUiDataLabel(UiKey.ProgressBarGlobal)

  return (
    <div className="h-1">
      {isLoading ? (
        // <LinearProgress aria-label={label} className="h-full" />
        <></>
      ) : null}
    </div>
  )
}
