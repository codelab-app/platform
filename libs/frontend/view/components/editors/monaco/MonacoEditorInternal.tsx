import { useEffect, useRef, useState } from 'react'
import { MonacoEditorProps } from './MonacoEditorProps'
import { monaco } from './setupMonaco'

/**
 * Usually you would want to use MonacoEditor export from ./index, because
 * this can't be used in SSR
 */
const MonacoEditorInternal = ({
  value,
  initialValue,
  onChange,
  editorOptions,
  containerProps,
  onMount,
}: MonacoEditorProps) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()
  const cachedValueRef = useRef<string>(value ?? initialValue ?? '')
  const changeHandlerRef = useRef<monaco.IDisposable | undefined>(undefined)

  useEffect(() => {
    const editor = (editorRef.current = monaco.editor.create(
      divRef.current as HTMLDivElement,
      {
        value: cachedValueRef.current,
        ...(editorOptions ?? {}),
      },
    ))

    if (!editor) {
      return
    }

    setIsEditorLoaded(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (onMount && isEditorLoaded && editorRef.current) {
      onMount(editorRef.current, monaco)
    }
  }, [onMount, isEditorLoaded])

  useEffect(() => {
    const editor = editorRef.current

    if (editor && value && value !== cachedValueRef.current) {
      cachedValueRef.current = value || ''
      editor.setValue(value || '')
    }
  }, [value])

  useEffect(() => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    if (editorOptions) {
      editor.updateOptions(editorOptions)
    }
  }, [editorOptions])

  cachedValueRef.current = value ?? ''
  useEffect(() => {
    if (isEditorLoaded && onChange) {
      changeHandlerRef.current = editorRef.current?.onDidChangeModelContent(
        (event) => {
          const editorValue = editorRef.current?.getValue()

          if (cachedValueRef.current !== editorValue) {
            onChange(editorValue ?? '')
          }
        },
      )
    }

    return () => {
      changeHandlerRef.current?.dispose()
    }
  }, [isEditorLoaded, onChange])

  useEffect(() => {
    return () => {
      editorRef.current?.dispose()
    }
  }, [])

  return (
    <div
      ref={divRef}
      style={{
        height: '100%',
        ...(containerProps?.style ?? {}),
      }}
      {...(containerProps ?? {})}
    />
  )
}

export { MonacoEditorInternal }
export default MonacoEditorInternal
