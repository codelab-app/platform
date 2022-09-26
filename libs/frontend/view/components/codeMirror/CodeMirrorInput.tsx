import { ExpandAltOutlined } from '@ant-design/icons'
import { Nullish } from '@codelab/shared/abstract/types'
import { closeCompletion, startCompletion } from '@codemirror/autocomplete'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { SerializedStyles } from '@emotion/react'
import { ReactCodeMirrorProps, useCodeMirror } from '@uiw/react-codemirror'
import { merge } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { CodeMirrorModal, CodeMirrorModalProps } from './CodeMirrorModal'
import { containerStyles, editorStyles, ExpandButton } from './styles'

export interface CodeMirrorInputProps
  extends Omit<ReactCodeMirrorProps, 'title'> {
  value?: string
  onChange: (value: string) => void
  onSave?: (value: string) => void
  expandable?: boolean
  singleLine?: boolean
  overrideStyles?: SerializedStyles
  title?: Nullish<string>
}

export const CodeMirrorInput = ({
  value = '',
  onChange,
  onSave,
  expandable,
  title,
  overrideStyles,
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
    overWriteOpts?,
  ) =>
    merge(
      {
        ...props,
        container: editorRef.current,
        basicSetup: false,
        value,
        onUpdate,
        onChange: (v: string, view: ViewUpdate) => {
          onChange(v)
        },
      },
      overWriteOpts,
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
    <div css={[containerStyles, overrideStyles]}>
      {/* The Editor */}
      <div css={editorStyles} ref={editor} />

      {/* The Expanded Editor */}
      {expandable && (
        <React.Fragment>
          <ExpandButton
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
        </React.Fragment>
      )}
    </div>
  )
}
