import { $generateNodesFromDOM } from '@lexical/html'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import { $getRoot, $insertNodes } from 'lexical'
import React, { useCallback, useEffect } from 'react'
import { ToolbarPlugin } from './plugins/ToolbarPlugin'

export const OnInitPlugin = ({
  data,
  editable,
  onChange,
  onClose,
}: {
  editable: boolean
  data: string | undefined
  onChange(state: EditorState, editor: LexicalEditor, tags: Set<string>): void
  onClose(): void
}) => {
  const [editor] = useLexicalComposerContext()

  const updateValue = useCallback(() => {
    editor.update(() => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(data || '', 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)

      $getRoot().select()
      $getRoot().clear()
      $insertNodes(nodes)
    })
  }, [data, editor])

  useEffect(() => {
    updateValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    editor.setEditable(editable)
    updateValue()
  }, [editor, editable])

  return editable ? (
    <>
      <ToolbarPlugin onClose={onClose} />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ClearEditorPlugin />
      <TabIndentationPlugin />
    </>
  ) : null
}
