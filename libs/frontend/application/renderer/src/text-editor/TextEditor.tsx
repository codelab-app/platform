import './editorjs.overrides.css'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { OutputData } from '@editorjs/editorjs'
import EditorJS from '@editorjs/editorjs'
import React, { memo, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { EDITOR_TOOLS } from './editor.tools'

interface Props {
  data?: string
  elementId: string
  readOnly?: boolean
}

const TextEditor = ({ data, elementId, readOnly }: Props) => {
  const { elementService, propService } = useStore()
  const [editor, setEditor] = React.useState<EditorJS | null>(null)
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

  // This is for being backwards compatible with the old text editor
  const getInitialData = (): OutputData => {
    if (!data) {
      return createEditorContent()
    }

    try {
      return JSON.parse(data)
    } catch {
      return createEditorContent(data)
    }
  }

  useEffect(() => {
    if (!editor) {
      console.debug('TextEditor initialized for the first time!')

      const newEditor = new EditorJS({
        data: getInitialData(),
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
          setEditor(newEditor)
        },
        readOnly,
        tools: EDITOR_TOOLS,
      })
    }

    return () => {
      // Make sure is ready before destroying
      void editor?.isReady.then(() => editor.destroy())
    }
  }, [])

  useEffect(() => {
    /**
     * https://editorjs.io/configuration/
     */
    void editor?.isReady.then(async () => {
      await editor.readOnly.toggle(readOnly)

      if (editor.blocks.getBlocksCount() === 0) {
        // without a placeholder text, adding a new text is a little difficult
        const placeholderBlock = createEditorContent('Text')

        await editor.render(placeholderBlock)
      }

      selectAllTextInTheElement(elementId)
    })

    console.debug('TextEditor readOnly changed', readOnly)
  }, [readOnly])

  return <div id={holder} />
}

// export default memo(TextEditor)
export default TextEditor

const selectAllTextInTheElement = (elementId: string) => {
  const editableElement = document.querySelector(
    `[data-element-id="${elementId}"] [contenteditable="true"]`,
  )

  if (!editableElement) {
    return
  }

  const range = document.createRange()

  range.selectNodeContents(editableElement)

  const selection = window.getSelection()

  selection?.removeAllRanges()
  selection?.addRange(range)
}

const createEditorContent = (text = '') => {
  return {
    blocks: [
      {
        data: {
          text,
        },
        type: 'paragraph',
      },
    ],
  }
}
