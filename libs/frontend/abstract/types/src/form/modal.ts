import { ModalProps } from 'antd/lib/modal'
import React, { ReactElement } from 'react'
import { FormProps, SubmitRef } from './form'

export type FormModalProps<TData> = {
  /**
   * SubmitRef is created inside modal, and passed down to form
   */
  children(props: SubmitRef): ReactElement<FormProps<TData>>
} & ModalProps
