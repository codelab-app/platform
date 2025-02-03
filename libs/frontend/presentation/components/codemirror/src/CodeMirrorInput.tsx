'use client'

import type { Nullish } from '@codelab/shared/abstract/types'
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror'

import ExpandAltOutlined from '@ant-design/icons/ExpandAltOutlined'
import { closeCompletion, startCompletion } from '@codemirror/autocomplete'
import { EditorView, type ViewUpdate } from '@codemirror/view'
import { useCodeMirror } from '@uiw/react-codemirror'
import { Fragment, useEffect, useRef, useState } from 'react'
import { merge } from 'remeda'

import type { CodeMirrorModalProps } from './CodeMirrorModal'

import { CodeMirrorModal } from './CodeMirrorModal'
import { containerStyles, editorStyles, ExpandButton } from './styles'

export interface CodeMirrorInputProps
  // Removed `prefix` due to type error mismatch
  extends Omit<ReactCodeMirrorProps, 'prefix' | 'title'> {
  className?: string
  cssString?: string
  expandable?: boolean
  singleLine?: boolean
  title?: Nullish<string>
  value?: string
  onChange(value: string): void
  onSave?(value: string): void
}

export const CodeMirrorInput = ({
  className,
  cssString,
  expandable,
  onChange,
  onSave,
  title,
  value = '',
  ...props
}: CodeMirrorInputProps) => {
  const editor = useRef<HTMLDivElement | null>(null)
  const [isExpand, expand] = useState(false)

  const toggleCompletion = (start: boolean, view: EditorView) =>
    start ? startCompletion(view) : closeCompletion(view)

  const onUpdate = (viewUpdate: ViewUpdate) => {
    if (viewUpdate.focusChanged) {
      toggleCompletion(viewUpdate.view.hasFocus, viewUpdate.view)
    }
  }

  const setupFactory: CodeMirrorModalProps['setupFactory'] = (
    editorRef,
    overWriteOpts = {},
  ) =>
    // TODO: if we need to use mergeDeep then we need to change typing
    merge(
      {
        ...props,
        basicSetup: false,
        container: editorRef.current,
        extensions: [
          EditorView.contentAttributes.of({
            'aria-label': title ?? '',
            id: props.id ?? '',
          }),
        ],
        onChange: (_value: string, view: ViewUpdate) => {
          onChange(_value)
        },
        onUpdate,
        value,
      },
      { ...overWriteOpts },
    )

  const { setContainer } = useCodeMirror(setupFactory(editor))

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleExpand = () => {
    expand((curIsExpand) => !curIsExpand)
  }

  return (
    <div className={className} css={[containerStyles, cssString]}>
      {/* The Editor */}
      <div css={editorStyles} ref={editor} />

      {/* The Expanded Editor */}
      {expandable && (
        <Fragment>
          <ExpandButton
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="CodeMirrorInput--btnExpand"
            icon={<ExpandAltOutlined width="12px" />}
            onClick={toggleExpand}
            size="small"
            type="primary"
          />
          <CodeMirrorModal
            closeModal={toggleExpand}
            onChange={onChange}
            onSave={onSave}
            setupFactory={setupFactory}
            title={title}
            value={value}
            visible={isExpand}
          />
        </Fragment>
      )}
    </div>
  )
}
