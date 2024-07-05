import type { ModalProps } from 'antd/lib/modal'
import type { ReactElement } from 'react'
import type { UnknownObject } from 'uniforms'
import type { FormProps, SubmitRef } from './form'

export type FormModalProps<TData extends Record<string, unknown>> =
  ModalProps & {
    /**
     * SubmitRef is created inside modal, and passed down to form
     */
    children(props: SubmitRef): ReactElement<FormProps<TData>>
  }
