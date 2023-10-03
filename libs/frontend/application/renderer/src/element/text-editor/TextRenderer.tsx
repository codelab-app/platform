import Output from 'editorjs-react-renderer'
import React, { memo, useMemo } from 'react'

interface Props {
  data?: string
}

const TextRenderer = ({ data }: Props) => {
  const parsedData = useMemo(() => {
    try {
      return JSON.parse(data || '{}')
    } catch (err) {
      return { blocks: [{ data: { text: data }, type: 'paragraph' }] }
    }
  }, [data])

  return <Output data={parsedData} />
}

export default memo(TextRenderer)
