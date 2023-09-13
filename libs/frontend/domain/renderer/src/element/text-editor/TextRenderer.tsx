import Output from 'editorjs-react-renderer'
import React, { memo, useMemo } from 'react'

interface Props {
  data?: string
}

const TextRenderer = ({ data }: Props) => {
  const parsedData = useMemo(() => JSON.parse(data || '{}'), [data])

  return <Output data={parsedData} />
}

export default memo(TextRenderer)
