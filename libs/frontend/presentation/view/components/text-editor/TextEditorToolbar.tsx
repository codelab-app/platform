import { Popover } from 'antd'
import type { LexicalEditor } from 'lexical'
import type { PropsWithChildren, RefObject } from 'react'
import React from 'react'
import { ToolbarPlugin } from './plugins'

type TextEditorToolbarProps = PropsWithChildren<{
  floatingToolbar: boolean
  editable: boolean
  editorRef: RefObject<LexicalEditor>
}>

export const TextEditorToolbar = ({
  children,
  editable,
  editorRef,
  floatingToolbar,
}: TextEditorToolbarProps) =>
  floatingToolbar ? (
    <Popover
      afterOpenChange={() => {
        editorRef.current?.focus()
      }}
      arrow={false}
      content={<ToolbarPlugin />}
      open={editable}
    >
      {children}
    </Popover>
  ) : (
    <>
      {editable && <ToolbarPlugin />}
      {children}
    </>
  )
