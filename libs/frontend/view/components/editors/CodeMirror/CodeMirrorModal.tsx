import { Nullish } from '@codelab/shared/abstract/types'
import { UseCodeMirror, useCodeMirror } from '@uiw/react-codemirror'
import AntdModal from 'antd/lib/modal'
import React, { useEffect, useRef, useState } from 'react'

interface CodeMirrorModalProps {
  visible: boolean
  onChange: (value: string) => void
  title?: Nullish<string>
  value?: string
  closeModal: () => void
  codeMirrorSetupFactory: (
    editorRef: React.MutableRefObject<HTMLDivElement | null>,
    overWriteOpts?: UseCodeMirror,
  ) => UseCodeMirror
}

export const CodeMirrorModal = ({
  visible,
  closeModal,
  value,
  codeMirrorSetupFactory,
  onChange,
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
    onChange && onChange(internalValue || '')
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
