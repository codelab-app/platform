import AlignCenterOutlined from '@ant-design/icons/AlignCenterOutlined'
import AlignLeftOutlined from '@ant-design/icons/AlignLeftOutlined'
import AlignRightOutlined from '@ant-design/icons/AlignRightOutlined'
import BoldOutlined from '@ant-design/icons/BoldOutlined'
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import ItalicOutlined from '@ant-design/icons/ItalicOutlined'
import RedoOutlined from '@ant-design/icons/RedoOutlined'
import StrikethroughOutlined from '@ant-design/icons/StrikethroughOutlined'
import UnderlineOutlined from '@ant-design/icons/UnderlineOutlined'
import UndoOutlined from '@ant-design/icons/UndoOutlined'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { Button, Divider, Flex, Segmented } from 'antd'
import type { SegmentedOptions } from 'antd/lib/segmented'
import type { ElementFormatType } from 'lexical'
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
import { AlignJustifyOutline } from './Icons'

const LowPriority = 1

// TODO: add more features and fixes

export const ToolbarPlugin = ({
  onExitEditing,
}: {
  onExitEditing?(): void
}) => {
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

  const alignOptions: SegmentedOptions<ElementFormatType> = [
    { icon: <AlignLeftOutlined />, value: 'left' },
    { icon: <AlignCenterOutlined />, value: 'center' },
    { icon: <AlignRightOutlined />, value: 'right' },
    { icon: <AlignJustifyOutline />, value: 'justify' },
  ]

  return (
    <Flex gap="small" id="lexical-toolbar" wrap="wrap">
      <Button
        aria-label="Undo"
        disabled={!canUndo}
        icon={<UndoOutlined />}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
      />
      <Button
        aria-label="Redo"
        disabled={!canRedo}
        icon={<RedoOutlined />}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      />
      <Button
        aria-label="Format Bold"
        icon={<BoldOutlined />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
      />
      <Button
        aria-label="Format Italics"
        icon={<ItalicOutlined />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        }}
      />
      <Button
        aria-label="Format Underline"
        icon={<UnderlineOutlined />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }}
      />
      <Button
        aria-label="Format Strikethrough"
        icon={<StrikethroughOutlined />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }}
      />
      <Segmented<ElementFormatType>
        onChange={(value) =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
        }
        options={alignOptions}
      />

      {onExitEditing && (
        <>
          <Divider type="vertical" />
          <Button
            aria-label="Exist Editing"
            icon={<CheckOutlined />}
            onClick={() => {
              onExitEditing()
            }}
          />
        </>
      )}
    </Flex>
  )
}
