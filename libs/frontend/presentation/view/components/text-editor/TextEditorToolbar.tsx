import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'
import { Popover } from 'antd'
import type { LexicalEditor } from 'lexical'
import type { PropsWithChildren } from 'react'
import React, { useRef } from 'react'
import { ToolbarPlugin } from './plugins'

type TextEditorToolbarProps = PropsWithChildren<{
  floatingToolbar: boolean
  editable: boolean
  onExitEditing?(): void
}>

export const TextEditorToolbar = ({
  children,
  editable,
  floatingToolbar,
  onExitEditing,
}: TextEditorToolbarProps) => {
  const editorRef = useRef<LexicalEditor>(null)

  return floatingToolbar ? (
    <>
      <EditorRefPlugin editorRef={editorRef} />
      <Popover
        afterOpenChange={() => {
          editorRef.current?.focus()
        }}
        arrow={false}
        content={<ToolbarPlugin onExitEditing={onExitEditing} />}
        open={editable}
      >
        {children}
      </Popover>
    </>
  ) : (
    <>
      {editable && <ToolbarPlugin onExitEditing={onExitEditing} />}
      {children}
    </>
  )
}
