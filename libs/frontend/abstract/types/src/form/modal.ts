import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ModalProps } from 'antd/lib/modal'
import type { ReactElement } from 'react'
import type { FormProps, SubmitRef } from './form'

export type FormModalProps<TData extends ObjectLike> = ModalProps & {
  /**
   * SubmitRef is created inside modal, and passed down to form
   */
  children(props: SubmitRef): ReactElement<FormProps<TData>>
}
