import {
  autocompletion,
  closeCompletion,
  startCompletion,
} from '@codemirror/autocomplete'
import { css } from '@emotion/react'
import { useCodeMirror, ViewUpdate } from '@uiw/react-codemirror'
import React, { useEffect, useRef } from 'react'
import { basicSetup, completionsFactory } from './codemirror-extensions'
import { CodeMirrorInputProps } from './types'

export const CodeMirrorInput = ({
  value,
  onChange,
  onBlur,
  defaultCompletionSource,
  templateCompletionOptions,
  extensions = [],
  shouldDisableNewLines = true,
  defaultCompletionOptions,
  height = '30px',
  ...props
}: CodeMirrorInputProps) => {
  const editor = useRef<HTMLDivElement | null>(null)

  const extensionsRef = useRef([
    basicSetup(shouldDisableNewLines),
    autocompletion({
      defaultKeymap: false,
      activateOnTyping: true,
      override: [
        completionsFactory({
          defaultCompletionSource,
          templateCompletionOptions: templateCompletionOptions ?? [],
          defaultCompletionOptions: defaultCompletionOptions ?? [],
        }),
      ],
    }),
    ...extensions,
  ])

  const { setContainer } = useCodeMirror({
    container: editor.current,
    basicSetup: false,
    value,
    onChange,
    height,
    onBlur,
    extensions: extensionsRef.current,
    onUpdate(viewUpdate: ViewUpdate): void {
      // open the completion on focus and close on blur
      if (viewUpdate.focusChanged) {
        if (viewUpdate.view.hasFocus) {
          startCompletion(viewUpdate.view)
        } else {
          closeCompletion(viewUpdate.view)
        }
      }
    },
    ...props,
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [])

  return <div css={editorStyles} ref={editor} />
}

const editorStyles = css`
  // Styles taken from ant-input - to make it look similar to other fields
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 0 4px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;

  &:focus-within {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    border-right-width: 1px !important;
    outline: 0;
  }

  // Remove dotted line on focus
  .cm-editor.cm-focused {
    outline: none;
  }

  // I couldn't find how to disable the line numbers, for now I'm just hiding the gutter, but there must be an option to not render them somewhere
  .cm-gutters {
    display: none;
  }

  .cm-line {
    background: none;
  }

  .cm-tooltip-autocomplete {
    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    padding: 4px;
  }

  .cm-tooltip-autocomplete > ul > li {
    padding: 3px 5px !important;
    border-radius: 4px;
  }
`
