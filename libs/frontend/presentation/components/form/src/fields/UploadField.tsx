'use client'
import type { DraggerProps } from 'antd/lib/upload/Dragger'
import type { FieldProps } from 'uniforms'

import { useErrorNotify } from '@codelab/frontend-infra-context'
import Dragger from 'antd/lib/upload/Dragger'
import { connectField } from 'uniforms'
import { wrapField } from 'uniforms-antd'

export type UploadFieldProps = FieldProps<
  string,
  DraggerProps,
  { children?: React.ReactNode }
>

const UploadFieldInternal = (props: UploadFieldProps) => {
  const onError = useErrorNotify({ title: 'File upload failed' })

  return wrapField(
    props,
    <Dragger
      name={props.name}
      onChange={(info) => {
        const { status } = info.file

        if (status === 'error') {
          onError(info.file.error)
        }

        if (status === 'done') {
          props.onChange(info.file.toString())
        }
      }}
    >
      {props.children}
    </Dragger>,
  )
}

export const UploadField = connectField<UploadFieldProps>(UploadFieldInternal, {
  kind: 'leaf',
})
