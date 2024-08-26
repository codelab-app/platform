import { UiDataRecord } from '@codelab/frontend/abstract/types'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

interface ProgressBarProps {
  isLoading: boolean
}

export const ProgressBar = ({ isLoading }: ProgressBarProps) => {
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
