import type { ModalProps } from 'antd/lib/modal'
import type { ReactElement } from 'react'
import type { FormProps, SubmitRef } from './form'

export type FormModalProps<TData> = {
  /**
   * SubmitRef is created inside modal, and passed down to form
   */
  children(props: SubmitRef): ReactElement<FormProps<TData>>
} & ModalProps
