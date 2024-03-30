import './editorjs.overrides.css'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { OutputData } from '@editorjs/editorjs'
import EditorJS from '@editorjs/editorjs'
import React, { memo, useEffect } from 'react'
import type { TextEditorProps } from './editor'
import {
  createEditorContent,
  getInitialData,
  selectAllTextInTheElement,
} from './editor'
import { EDITOR_TOOLS } from './editor.tools'

const TextEditor = ({ compositeKey, data, readOnly }: TextEditorProps) => {
  const { propService, runtimeElementService } = useStore()
  const [editor, setEditor] = React.useState<EditorJS | null>(null)
  const runtimeElement = runtimeElementService.runtimeElement(compositeKey)
  const element = runtimeElement.element.current
  const holder = `${element.id}-editor`

  const onChange = (output: OutputData) => {
    const props = element.props
    const renderType = element.renderType.current

    return propService.updateWithDefaultValuesApplied(props, {
      data: { ...props.data.data, customText: JSON.stringify(output) },
      defaultValues: renderType.api.current.defaultValues,
      id: props.id,
    })
  }

  useEffect(() => {
    if (!editor) {
      const newEditor = new EditorJS({
        data: getInitialData(data),
        hideToolbar: true,
        holder,
        inlineToolbar: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'link',
          'color',
          'marker',
          'inlineCode',
        ],
        onChange: async (api) => {
          if (api.readOnly.isEnabled) {
            return
          }

          const outputData = await api.saver.save()

          await onChange(outputData)
        },
        readOnly,
        tools: EDITOR_TOOLS,
      })

      setEditor(newEditor)
    }

    return () => {
      if (editor?.destroy) {
        editor.destroy()
      }
    }
  }, [])

  useEffect(() => {
    void editor?.isReady.then(async () => {
      await editor.readOnly.toggle(readOnly)

      if (editor.blocks.getBlocksCount() === 0) {
        // without a placeholder text, adding a new text is a little difficult
        const placeholderBlock = createEditorContent('Text')

        await editor.render(placeholderBlock)
      }

      selectAllTextInTheElement(element.id)
    })
  }, [readOnly])

  return <div id={holder} />
}

export default memo(TextEditor)
