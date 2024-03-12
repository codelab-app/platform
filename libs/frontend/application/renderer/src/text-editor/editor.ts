import type { OutputData } from '@editorjs/editorjs'

export interface TextEditorProps {
  data?: string
  elementId: string
  readOnly?: boolean
}

// This is for being backwards compatible with the old text editor
export const getInitialData = (data: string = ''): OutputData => {
  try {
    return JSON.parse(data)
  } catch {
    return createEditorContent(data)
  }
}

export const createEditorContent = (text = '') => {
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

export const selectAllTextInTheElement = (elementId: string) => {
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
