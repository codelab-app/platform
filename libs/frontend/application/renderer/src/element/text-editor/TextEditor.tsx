import './editorjs.overrides.css'
import { useStore } from '@codelab/frontend/application/shared/store'
import { getDefaultFieldProps } from '@codelab/frontend/domain/prop'
import type { OutputData } from '@editorjs/editorjs'
import EditorJS from '@editorjs/editorjs'
import React, { memo, useEffect } from 'react'
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

    return propService.updateWithDefaultValuesApplied({
      data: { ...props.data.data, customText: JSON.stringify(output) },
      defaultValues: getDefaultFieldProps(element.renderType.current),
      id: props.id,
    })
  }

  // This is for being backwards compatible with the old text editor
  const getInitialData = (): OutputData => {
    if (!data) {
      return emptyBlock
    }

    try {
      return JSON.parse(data)
    } catch {
      return emptyBlock
    }
  }

  useEffect(() => {
    if (!editor) {
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
    const toggleReadonly = async () => {
      if (editor) {
        await editor.readOnly.toggle(readOnly)

        if (editor.blocks.getBlocksCount() === 0) {
          // without a placeholder text, adding a new text is a little difficult
          await editor.render(placholderBlock)
        }

        selectAllTextInTheElement(elementId)
      }
    }

    void toggleReadonly()
  }, [readOnly])

  return <div id={holder} />
}

export default memo(TextEditor)

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

const placholderBlock = {
  blocks: [
    {
      data: {
        text: 'Text',
      },
      type: 'paragraph',
    },
  ],
}

const emptyBlock = { blocks: [{ data: { text: '' }, type: 'paragraph' }] }
