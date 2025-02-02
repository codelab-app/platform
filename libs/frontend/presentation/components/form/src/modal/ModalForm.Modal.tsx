'use client'

import type { Maybe } from '@codelab/shared/abstract/types'
import type { ModalProps as AntModalProps } from 'antd/lib/modal'
import type { PropsWithChildren } from 'react'

import {
  getUiDataLabel,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import AntdModal from 'antd/lib/modal'
import { useRef, useState } from 'react'

import { handleSubmitRefModalOk } from '../components/utils'
import { ModalFormContext } from './modal-form.context'

export type ModalProps = Pick<
  AntModalProps,
  | 'cancelButtonProps'
  | 'className'
  | 'okButtonProps'
  | 'okText'
  | 'onCancel'
  | 'onOk'
  | 'open'
  | 'title'
> & { uiKey: UiKey }

export const Modal = ({
  cancelButtonProps,
  children,
  className,
  okButtonProps,
  okText,
  onCancel,
  onOk,
  open,
  uiKey,
}: PropsWithChildren<ModalProps>) => {
  const [isLoading, setIsLoading] = useState(false)
  // This is the controller that will do the form submission, create by the modal and passed down to the form
  const submitRef = useRef<Maybe<SubmitController>>(undefined)

  return (
    <ModalFormContext.Provider value={{ isLoading, setIsLoading, submitRef }}>
      <AntdModal
        // This is needed, because otherwise form values persist even after closing the modal
        cancelButtonProps={{
          ...cancelButtonProps,
          disabled: isLoading,
        }}
        className={className}
        data-testid={uiKey}
        destroyOnClose
        okButtonProps={{
          // Pass down any button props we get from the modalProps prop
          ...okButtonProps,
          'aria-label': getUiDataLabel(UiKey.ButtonConfirmation),
          disabled: isLoading,
          loading: isLoading,
          role: 'button',
        }}
        okText={okText}
        onCancel={onCancel}
        onOk={handleSubmitRefModalOk(submitRef, onOk)}
        open={open}
      >
        {children}
      </AntdModal>
    </ModalFormContext.Provider>
  )
}
