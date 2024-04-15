import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { useDebouncedCallback } from '@react-hookz/web'
import type { EditorState, LexicalEditor } from 'lexical'
import { $getRoot, $insertNodes } from 'lexical'
import React, { useCallback, useEffect } from 'react'

interface OnInitPluginProps {
  config: InitialConfigType
  data: string | undefined
  onChange(state: EditorState, editor: LexicalEditor, tags: Set<string>): void
}

export const OnInitPlugin = ({ config, data, onChange }: OnInitPluginProps) => {
  const [editor] = useLexicalComposerContext()

  const updateValue = useCallback(() => {
    editor.update(() => {
      const currentState = $generateHtmlFromNodes(editor)

      if (currentState === data) {
        return
      }

      const parser = new DOMParser()
      const dom = parser.parseFromString(data || '', 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)

      $getRoot().select()
      $getRoot().clear()
      $insertNodes(nodes)
    })
  }, [data, editor])

  /**
   * We set the initial value on first render in both modes edit and read
   */
  useEffect(() => {
    updateValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    editor.setEditable(Boolean(config.editable))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, config.editable])

  const debouncedOnChange = useDebouncedCallback(onChange, [], 500)

  return config.editable ? (
    <>
      <OnChangePlugin ignoreSelectionChange onChange={debouncedOnChange} />
      <HistoryPlugin />
      <ClearEditorPlugin />
      <TabIndentationPlugin />
    </>
  ) : null
}
