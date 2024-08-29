import React, { useEffect, useState } from 'react'
import { Progress } from './Progress'

export default {
  component: Progress,
  title: 'Atoms/Progress',
}

export const ProgressDemo = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)

    return () => clearTimeout(timer)
  }, [])

  return <Progress className="w-3/5" value={progress} />
}

export const Default = {
  args: {},
  render: () => <ProgressDemo />,
}
