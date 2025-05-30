'use client'
import type { RefSelectProps } from 'antd'
import type { Ref } from 'react'
import type { ReactQuillProps } from 'react-quill'
import type { FieldProps } from 'uniforms'

import { ReactQuill } from '@codelab/frontend-presentation-components-reactquill'
import { connectField, filterDOMProps } from 'uniforms'
import { wrapField } from 'uniforms-antd'

export type ReactQuillFieldProps = FieldProps<
  string,
  ReactQuillProps,
  { inputRef?: Ref<RefSelectProps> }
>

export const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link'],
    ['clean'],
  ],
}

const ReactQuillInternal = (props: ReactQuillFieldProps) =>
  wrapField(
    props,
    <ReactQuill
      modules={modules}
      onChange={(value) => {
        props.onChange(value)
      }}
      placeholder={props.placeholder}
      theme="snow"
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  )

export const ReactQuillField = connectField<ReactQuillFieldProps>(
  ReactQuillInternal,
  { kind: 'leaf' },
)
