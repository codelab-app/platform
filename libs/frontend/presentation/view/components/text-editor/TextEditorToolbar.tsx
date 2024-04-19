import { Popover } from 'antd'
import type { LexicalEditor } from 'lexical'
import type { PropsWithChildren, RefObject } from 'react'
import React from 'react'
import { ToolbarPlugin } from './plugins'

type TextEditorToolbarProps = PropsWithChildren<{
  floatingToolbar: boolean
  editable: boolean
  editorRef: RefObject<LexicalEditor>
  onExitEditing?(): void
}>

export const TextEditorToolbar = ({
  children,
  editable,
  editorRef,
  floatingToolbar,
  onExitEditing,
}: TextEditorToolbarProps) =>
  floatingToolbar ? (
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
  ) : (
    <>
      {editable && <ToolbarPlugin onExitEditing={onExitEditing} />}
      {children}
    </>
  )
