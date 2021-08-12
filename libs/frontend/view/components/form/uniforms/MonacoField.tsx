import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import React, { Ref, useRef } from 'react'
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms'

export type MonacoFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>

const _MonacoField = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  value,
  ...props
}: MonacoFieldProps) => {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
  }

  // const showValue = () => {
  //   alert(editorRef?.current.getValue())
  // }

  const handleEditorChange: OnChange = (val, event) => {
    onChange(val)
  }

  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <Editor
        height="200px"
        onMount={handleEditorDidMount}
        defaultLanguage="javascript"
        onChange={handleEditorChange}
        defaultValue={
          value ??
          `/**
 * The exported handler function is what AWS Lambda will execute.
 *
 * Uncomment below & modify.
*/

// exports.handler = async (event, context) => {
//    return "Hello World!"
// }
        `
        }
      />
    </div>
  )
}

export const MonacoField = connectField<MonacoFieldProps>(_MonacoField, {
  kind: 'leaf',
})
