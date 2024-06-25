import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import { $getRoot, $insertNodes } from 'lexical'
import React, { useCallback, useEffect } from 'react'

interface OnInitPluginProps {
  config: InitialConfigType
  value: string | undefined
  onChange(state: EditorState, editor: LexicalEditor, tags: Set<string>): void
}

export const OnInitPlugin = ({
  config,
  onChange,
  value,
}: OnInitPluginProps) => {
  const [editor] = useLexicalComposerContext()

  const updateValue = useCallback(
    (_data: string | undefined) => {
      editor.update(() => {
        const currentState = $generateHtmlFromNodes(editor)

        if (currentState === _data) {
          return
        }

        const parser = new DOMParser()
        const dom = parser.parseFromString(_data || '', 'text/html')
        const nodes = $generateNodesFromDOM(editor, dom)

        $getRoot().select()
        $getRoot().clear()
        $insertNodes(nodes)
      })
    },
    [editor],
  )

  /**
   * We set the initial value on first render in both modes edit and read
   */
  useEffect(() => {
    updateValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    editor.setEditable(Boolean(config.editable))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, config.editable])

  return config.editable ? (
    <>
      <OnChangePlugin ignoreSelectionChange onChange={onChange} />
      <HistoryPlugin />
      <ClearEditorPlugin />
      <TabIndentationPlugin />
    </>
  ) : null
}
