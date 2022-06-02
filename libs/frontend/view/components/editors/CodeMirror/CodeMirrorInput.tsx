import { ExpandAltOutlined } from '@ant-design/icons'
import {
  autocompletion,
  closeCompletion,
  startCompletion,
} from '@codemirror/autocomplete'
import { UseCodeMirror, useCodeMirror, ViewUpdate } from '@uiw/react-codemirror'
import React, { useEffect, useRef } from 'react'
import { basicSetup, completionsFactory } from './codemirror-extensions'
import { CodeMirrorModal } from './CodeMirrorModal'
import { containerStyles, editorStyles, ExpandButton } from './styles'
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
        completionsFactory({
          defaultCompletionSource,
          templateCompletionOptions: templateCompletionOptions ?? [],
          defaultCompletionOptions: defaultCompletionOptions ?? [],
        }),
      ],
    }),
    ...extensions,
  ])

  const codeMirrorOnUpdate = (viewUpdate: ViewUpdate) => {
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
            icon={<ExpandAltOutlined width="12px" />}
            onClick={toggleExpand}
            type="primary"
          />
          <CodeMirrorModal
            closeModal={toggleExpand}
            codeMirrorSetupFactory={codeMirrorSetupFactory}
            onChange={onChange}
            title={title}
            value={value}
            visible={isExpand}
          />
        </React.Fragment>
      )}
    </div>
  )
}
