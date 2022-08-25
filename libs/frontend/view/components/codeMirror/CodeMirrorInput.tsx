import { ExpandAltOutlined } from '@ant-design/icons'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  autocompletion,
  closeCompletion,
  Completion,
  CompletionSource,
  startCompletion,
} from '@codemirror/autocomplete'
import {
  ReactCodeMirrorProps,
  UseCodeMirror,
  useCodeMirror,
} from '@uiw/react-codemirror'
import React, { useEffect, useRef } from 'react'
import { CodeMirrorModal } from './CodeMirrorModal'
import { basicSetup, completionFactory } from './extensions'
import { containerStyles, editorStyles, ExpandButton } from './styles'

export interface CodeMirrorInputProps
  extends Omit<ReactCodeMirrorProps, 'title'> {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  onSave?: (value: string) => void
  defaultCompletionSource?: CompletionSource
  defaultCompletionOptions?: Array<Completion>
  templateCompletionOptions?: Array<Completion>
  extensions?: Array<any>
  shouldDisableNewLines?: boolean
  expandable?: boolean
  title?: Nullish<string>
}

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
  readOnly = false,
  onSave,
  title = '',
  expandable = true,
  ...props
}: CodeMirrorInputProps) => {
  const editor = useRef<HTMLDivElement | null>(null)
  const [isExpand, expand] = React.useState(false)

  const extensionsRef = useRef([
    basicSetup(shouldDisableNewLines),
    autocompletion({
      defaultKeymap: false,
      activateOnTyping: true,
      override: [
        completionFactory({
          defaultCompletionSource,
          templateCompletionOptions,
          defaultCompletionOptions,
        }),
      ],
    }),
    ...extensions,
  ])

  const codeMirrorOnUpdate = (viewUpdate: any) => {
    // open the completion on focus and close on blur
    if (viewUpdate.focusChanged) {
      if (viewUpdate.view.hasFocus) {
        startCompletion(viewUpdate.view)
      } else {
        closeCompletion(viewUpdate.view)
      }
    }
  }

  const codeMirrorSetupFactory = (
    editorRef: React.MutableRefObject<HTMLDivElement | null>,
    overWriteOpts?: UseCodeMirror,
  ) => {
    return {
      container: editorRef.current,
      basicSetup: false,
      value,
      onChange,
      height,
      onBlur,
      extensions: extensionsRef.current,
      onUpdate: codeMirrorOnUpdate,
      ...props,
      ...overWriteOpts,
      readOnly,
    }
  }

  const { setContainer } = useCodeMirror(codeMirrorSetupFactory(editor))

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [])

  const toggleExpand = () => {
    expand((curIsExpand) => !curIsExpand)
  }

  return (
    <div css={[containerStyles]}>
      <div css={editorStyles} ref={editor} />
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
            codeMirrorSetupFactory={codeMirrorSetupFactory}
            onChange={onChange}
            onSave={onSave}
            title={title}
            value={value}
            visible={isExpand}
          />
        </React.Fragment>
      )}
    </div>
  )
}
