import 'codemirror/mode/meta'
import './ReactCodeMirror.css'
import { Nullable } from '@codelab/shared/abstract/types'
import { IEditorInstance, IReactCodemirror } from '@uiw/react-codemirror3'
import CodeMirror, { EditorFromTextArea } from 'codemirror'
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

const defaultOptions = {
  tabSize: 2,
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  lineNumbers: true,
  fullScreen: true,
}

// https://github.com/codemirror/CodeMirror/tree/v3
const ReactCodeMirror = (
  props: IReactCodemirror &
    React.RefAttributes<IEditorInstance | undefined> = {},
  ref: any,
) => {
  const {
    options = {},
    value = '',
    width = '100%',
    height = '100%',
    lazyLoadMode = true,
  } = props

  const [editor, setEditor] = useState<Nullable<EditorFromTextArea>>()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lastestProps = useRef(props)

  useImperativeHandle(ref, () => ({ editor, textarea: textareaRef.current }), [
    editor,
    textareaRef,
  ])
  lastestProps.current = props

  const getEventHandleFromProps = () => {
    const propNames = Object.keys(props)

    const eventHandle = propNames.filter((keyName) => {
      return /^on+/.test(keyName)
    }) as Array<any>

    const eventDict: Record<string, string> = {}
    eventHandle.forEach((ele) => {
      const name = ele.slice(2)

      if (name && name[0]) {
        const ev = name[0]
        eventDict[ele] = name.replace(ev, ev.toLowerCase())
      }
    })

    return eventDict
  }

  const setOptions = async (instance: EditorFromTextArea, opt: any = {}) => {
    if (typeof opt === 'object' && window) {
      const mode = CodeMirror.findModeByName(opt.mode || '')

      if (lazyLoadMode && mode && mode.mode) {
        await import(`codemirror/mode/${mode.mode}/${mode.mode}.js`)
      }

      if (mode) {
        opt.mode = mode.mime
      }

      Object.keys(opt).forEach((name) => {
        if (opt[name] || opt[name] === false) {
          const optVal = opt[name]

          // internal change
          // html element on react can't be stringify
          if (!(optVal instanceof HTMLElement)) {
            // any because options of extensions are run-time, and dynamic
            instance.setOption(name as any, opt[name])
          }

          // https://github.com/uiwjs/react-codemirror/blob/v3/src/index.js#L54
          try {
            if (JSON.stringify(optVal)) {
              instance.setOption(name as any, optVal)
            }
            // eslint-disable-next-line no-empty
          } catch {}
        }
      })
    }
  }

  useEffect(() => {
    if (!editor && window && textareaRef.current) {
      const instance = CodeMirror.fromTextArea(textareaRef.current, {
        ...defaultOptions,
        ...options,
      })

      const eventDict = getEventHandleFromProps()

      Object.keys(eventDict).forEach((event) => {
        // any because events of extensions are run-time, and dynamic
        instance.on(eventDict[event as any] as any, (...params: Array<any>) => {
          if (!lastestProps.current) {
            return
          }

          const handler = (lastestProps.current as any)[event]

          if (handler) {
            handler(...params)
          }
        })
      })
      instance.setValue(value || '')

      if (width || height) {
        instance.setSize(width, height)
      }

      setEditor(instance)
      setOptions(instance, { ...defaultOptions, ...options })
    }

    return () => {
      if (editor && window) {
        editor.toTextArea()
        setEditor(undefined)
      }
    }
  }, [])

  useMemo(() => {
    if (!editor || !window) {
      return
    }

    const val = editor.getValue()

    if (value !== undefined && value !== val) {
      editor.setValue(value)
    }
  }, [value])

  useMemo(() => {
    if (!editor || !window) {
      return
    }

    editor.setSize(width, height)
  }, [width, height])

  useMemo(() => {
    if (!editor || !window) {
      return
    }

    setOptions(editor, { ...defaultOptions, ...options })
  }, [editor, options])

  return <textarea ref={textareaRef} />
}

export default React.forwardRef(ReactCodeMirror)
