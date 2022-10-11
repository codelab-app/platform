import { Nullish } from '@codelab/shared/abstract/types'
import { UseCodeMirror, useCodeMirror } from '@uiw/react-codemirror'
import AntdModal from 'antd/lib/modal'
import React, { useEffect, useRef, useState } from 'react'

type ISetupFactory = (
  editorRef: React.MutableRefObject<HTMLDivElement | null>,
  overWriteOpts?: UseCodeMirror,
) => UseCodeMirror

export interface CodeMirrorModalProps {
  visible: boolean
  onChange: (value: string) => void
  onSave?: (value: string) => void
  title?: Nullish<string>
  value?: string
  closeModal: () => void
  setupFactory: ISetupFactory
}

export const CodeMirrorModal = ({
  visible,
  closeModal,
  value,
  setupFactory: codeMirrorSetupFactory,
  onChange,
  onSave,
  title,
}: CodeMirrorModalProps) => {
  const editor = useRef<HTMLDivElement | null>(null)
  const [internalValue, setInternalValue] = useState(value)

  const { setContainer } = useCodeMirror(
    codeMirrorSetupFactory(editor, {
      value: internalValue,
      onChange: setInternalValue,
      height: '50vh',
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
      title={title}
      visible={visible}
      width="80vw"
    >
      <div className="mt-5" ref={editor} />
    </AntdModal>
  )
}
