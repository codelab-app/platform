/* eslint-disable tailwindcss/no-custom-classname */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as React from 'react'

const LowPriority = 1

const Divider = () => {
  return <div className="divider" />
}

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar()

          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)

          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)

          return false
        },
        LowPriority,
      ),
    )
  }, [editor, updateToolbar])

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        aria-label="Undo"
        className="toolbar-item spaced"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
      >
        <i className="format undo" />
      </button>
      <button
        aria-label="Redo"
        className="toolbar-item"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      >
        <i className="format redo" />
      </button>
      <Divider />
      <button
        aria-label="Format Bold"
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
      >
        <i className="format bold" />
      </button>
      <button
        aria-label="Format Italics"
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        }}
      >
        <i className="format italic" />
      </button>
      <button
        aria-label="Format Underline"
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }}
      >
        <i className="format underline" />
      </button>
      <button
        aria-label="Format Strikethrough"
        className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }}
      >
        <i className="format strikethrough" />
      </button>
      <Divider />
      {/* <button
        aria-label="Left Align"
        className="toolbar-item spaced"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
        }}
      >
        <i className="format left-align" />
      </button>
      <button
        aria-label="Center Align"
        className="toolbar-item spaced"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
        }}
      >
        <i className="format center-align" />
      </button>
      <button
        aria-label="Right Align"
        className="toolbar-item spaced"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
        }}
      >
        <i className="format right-align" />
      </button>
      <button
        aria-label="Justify Align"
        className="toolbar-item"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
        }}
      >
        <i className="format justify-align" />
      </button> */}
    </div>
  )
}
