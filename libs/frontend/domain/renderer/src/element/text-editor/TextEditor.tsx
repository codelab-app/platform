import { useStore } from '@codelab/frontend/presentation/container'
import { getDefaultFieldProps } from '@codelab/shared/utils'
import type { OutputData } from '@editorjs/editorjs'
import EditorJS from '@editorjs/editorjs'
import React, { memo, useEffect } from 'react'
import { EDITOR_TOOLS } from './editor.tools'

interface Props {
  data?: OutputData
  elementId: string
  readOnly?: boolean
}

const TextEditor = ({ data, elementId, readOnly }: Props) => {
  const { elementService, propService } = useStore()
  const [editor, setEditor] = React.useState<EditorJS | null>(null)
  const holder = `${elementId}-editor`

  const onChange = (output: OutputData) => {
    const element = elementService.element(elementId)
    const props = element.props.current

    return propService.updateWithDefaultValuesApplied({
      data: { ...props.data.data, customText: JSON.stringify(output) },
      defaultValues: getDefaultFieldProps(element.renderType?.current),
      id: props.id,
    })
  }

  useEffect(() => {
    if (!editor) {
      const newEditor = new EditorJS({
        data,
        hideToolbar: true,
        holder,
        onChange: async (api, event) => {
          const outputData = await api.saver.save()
          await onChange(outputData)
        },
        readOnly,
        tools: EDITOR_TOOLS,
      })

      setEditor(newEditor)
    }

    return () => {
      editor?.destroy()
    }
  }, [editor])

  return <div id={holder} />
}

export default memo(TextEditor)
