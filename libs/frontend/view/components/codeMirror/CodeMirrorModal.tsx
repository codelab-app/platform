import type { Nullish } from '@codelab/shared/abstract/types'
import type { UseCodeMirror } from '@uiw/react-codemirror'
import { useCodeMirror } from '@uiw/react-codemirror'
import AntdModal from 'antd/lib/modal'
import React, { useEffect, useRef, useState } from 'react'

type ISetupFactory = (
  editorRef: React.MutableRefObject<HTMLDivElement | null>,
  overWriteOpts?: UseCodeMirror,
) => UseCodeMirror

export interface CodeMirrorModalProps {
  setupFactory: ISetupFactory
  title?: Nullish<string>
  value?: string
  visible: boolean

  closeModal(): void
  onChange(value: string): void
  onSave?(value: string): void
}

export const CodeMirrorModal = ({
  closeModal,
  onChange,
  onSave,
  setupFactory: codeMirrorSetupFactory,
  title,
  value,
  visible,
}: CodeMirrorModalProps) => {
  const editor = useRef<HTMLDivElement | null>(null)
  const [internalValue, setInternalValue] = useState(value)

  const { setContainer } = useCodeMirror(
    codeMirrorSetupFactory(editor, {
      height: '100%',
      maxHeight: '100%',
      onChange: setInternalValue,
      value: internalValue,
    }),
  )

  useEffect(() => {
    if (!visible) {
      return
    }

    setInternalValue(value)

    if (editor.current) {
      setContainer(editor.current)
    }
  }, [visible])

  const onOk = () => {
    onChange(internalValue || '')
    onSave && onSave(internalValue || '')
    closeModal()
  }

  return (
    <AntdModal
      okText="Save"
      onCancel={closeModal}
      onOk={onOk}
      open={visible}
      title={title}
      width="80vw"
    >
      <div className="mt-5" ref={editor} style={{ height: '50vh' }} />
    </AntdModal>
  )
}
