import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/lint/lint'
import 'codemirror-graphql/hint'
import 'codemirror-graphql/lint'
import 'codemirror-graphql/mode'
// basic setup https://github.com/codemirror/basic-setup/blob/main/src/basic-setup.ts
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/fold/foldgutter'
import { IEditorInstance } from '@uiw/react-codemirror3'
import { EditorConfiguration } from 'codemirror'
import { GraphQLSchema } from 'graphql'
import { useEffect, useRef } from 'react'
import CodeMirror from './ReactCodeMirror'

export type CodeMirrorGraphQLEditorProps = {
  value?: string
  height?: string | number
  onChange?: (
    instance: CodeMirror.Editor,
    change: CodeMirror.EditorChange,
  ) => any
  schema?: GraphQLSchema
  editorOptions?: EditorConfiguration
}

const CodeMirrorGraphQLEditor = ({
  schema,
  editorOptions,
  value,
  ...rest
}: CodeMirrorGraphQLEditorProps) => {
  const editorRef = useRef<IEditorInstance>(null)

  useEffect(() => {
    const mask = document.querySelector('.ant-modal-mask')

    if (!mask) {
      return
    }

    const onMaskAnimationEnd = () => {
      if (!editorRef.current?.editor?.refresh) {
        return
      }

      editorRef.current.editor.refresh()
    }

    mask.addEventListener('animationend', onMaskAnimationEnd)

    return () => {
      mask.removeEventListener('animationend', onMaskAnimationEnd)
    }
  }, [])

  return (
    <div style={{ height: '500px' }}>
      <CodeMirror
        ref={editorRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        options={
          {
            ...editorOptions,
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            styleActiveLine: true,
            // styleActiveSelected: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            foldGutter: true,
            highlightSelectionMatches: true,
            mode: 'graphql',
            // lint: {
            //   schema,
            // },
            hintOptions: {
              schema,
              container: document.querySelector('.ant-modal-content'),
            },
          } as any
        }
        value={value}
      />
    </div>
  )
}

export default CodeMirrorGraphQLEditor
