// import Output from 'editorjs-react-renderer'
import dynamic from 'next/dynamic'
import React, { memo, useMemo } from 'react'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false },
)

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

  return (
    <Output
      data={parsedData}
      // TODO: the renderer adds some margin and text align, which can conflict
      // with the element's styles. Find out why this happens.
      style={{ paragraph: { margin: 'initial', textAlign: 'unset' } }}
    />
  )
}

export default memo(TextRenderer)
