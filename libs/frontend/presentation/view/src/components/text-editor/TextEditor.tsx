/* eslint-disable tailwindcss/no-custom-classname */
import './styles.css'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import React, { useRef } from 'react'
import styled from 'styled-components'
import useResizeObserver from 'use-resize-observer/polyfilled'
import { DisplayIf } from '../conditionalView'
import { OnInitPlugin, ToolbarPlugin } from './plugins'
import { defaultEditorTheme } from './theme'

const defaultConfig: InitialConfigType = {
  editable: true,
  namespace: 'TextEditor',
  // Handling of errors during update
  onError: (error: Error) => {
    console.error(error)
    throw error
  },
  theme: defaultEditorTheme,
}

export interface TextEditorProps {
  config?: Partial<InitialConfigType>
  value?: string
  onChange?(state: EditorState, editor: LexicalEditor, tags: Set<string>): void
  onResize?(size: { height: Maybe<number>; width: Maybe<number> }): void
}

const ToolbarContainer = styled.div`
  width: 100%;
  padding: 4px;
`

const Input = styled(ContentEditable)`
  width: 100%;
  padding: 4px 11px;
  margin: 0;
  text-align: left;
  outline: none;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.57;
  border-radius: 6px;
  transition: all 0.2s;

  &.active {
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  &:focus {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
    background-color: #ffffff;
  }
`

export const TextEditor = ({
  config = {},
  onChange = () => null,
  onResize = () => null,
  value,
}: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useResizeObserver({ onResize, ref: editorRef })

  const editorConfig = mergeProps<InitialConfigType>(defaultConfig, config)

  return (
    <div id="lexical-editor" ref={editorRef}>
      <LexicalComposer initialConfig={editorConfig}>
        <DisplayIf condition={Boolean(editorConfig.editable)}>
          <ToolbarContainer>
            <ToolbarPlugin />
          </ToolbarContainer>
        </DisplayIf>
        <OnInitPlugin config={editorConfig} onChange={onChange} value={value} />
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <Input
              className={`editor-input ${
                editorConfig.editable ? 'active' : ''
              }`}
            />
          }
          placeholder={null}
        />
      </LexicalComposer>
    </div>
  )
}

TextEditor.displayName = 'TextEditor'
