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

const TextEditor = ({ data, elementId, readOnly }: TextEditorProps) => {
  const { elementService, propService } = useStore()
  // const [editor, setEditor] = React.useState<EditorJS | null>(null)
  const editorRef = useRef<EditorJS | null>(null)
  const holder = `${elementId}-editor`

  const onChange = (output: OutputData) => {
    const element = elementService.element(elementId)
    const props = element.props
    const renderType = element.renderType.current

    return propService.updateWithDefaultValuesApplied(props, {
      data: { ...props.data.data, customText: JSON.stringify(output) },
      defaultValues: renderType.api.current.defaultValues,
      id: props.id,
    })
  }

  useEffect(() => {
    if (!editorRef.current) {
      console.debug('TextEditor initialized for the first time!')

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
        // Set after ready
        onReady: () => {
          editorRef.current = newEditor
        },
        readOnly,
        tools: EDITOR_TOOLS,
      })
    }

    return () => {
      const editor = editorRef.current

      // Make sure is ready before destroying
      void editor?.isReady.then(() => {
        editor.destroy()
        editorRef.current = null
      })
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

      selectAllTextInTheElement(elementId)
    })
  }, [readOnly])

  return <div id={holder} />
}

// export default memo(TextEditor)
export default TextEditor
