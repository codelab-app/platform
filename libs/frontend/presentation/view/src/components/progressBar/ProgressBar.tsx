import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

interface ProgressBarProps {
  isLoading: boolean
}

export const ProgressBar = ({ isLoading }: ProgressBarProps) => {
  return (
    <div className="h-1">
      {isLoading ? <LinearProgress className="h-full" /> : null}
    </div>
  )
}
