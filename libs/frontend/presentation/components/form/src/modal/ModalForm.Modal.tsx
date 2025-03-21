'use client'

import type { Maybe } from '@codelab/shared/abstract/types'
import type { ModalProps as AntModalProps } from 'antd/lib/modal'
import type { PropsWithChildren } from 'react'

import {
  getUiDataKey,
  getUiDataLabel,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { useIsMounted } from '@codelab/frontend/shared/utils'
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
> & { uiKey: UiKey; isLoading?: boolean }

export const Modal = ({
  cancelButtonProps,
  children,
  className,
  isLoading,
  okButtonProps,
  okText,
  onCancel,
  onOk,
  open,
  uiKey,
}: PropsWithChildren<ModalProps>) => {
  const [isLoadingComponent, setIsLoadingComponent] = useState(false)
  // This is the controller that will do the form submission, create by the modal and passed down to the form
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const isMounted = useIsMounted()

  // a workaround to overcome hydration failed error
  // a similar issue : https://github.com/radix-ui/primitives/issues/1386
  if (!isMounted) {
    return null
  }

  return (
    <ModalFormContext.Provider
      value={{
        isLoading: isLoadingComponent,
        setIsLoading: setIsLoadingComponent,
        submitRef,
      }}
    >
      <AntdModal
        // This is needed, because otherwise form values persist even after closing the modal
        cancelButtonProps={{
          ...cancelButtonProps,
          disabled: isLoadingComponent,
        }}
        className={className}
        data-testid={getUiDataKey(uiKey)}
        destroyOnClose
        okButtonProps={{
          // Pass down any button props we get from the modalProps prop
          ...okButtonProps,
          'aria-label': getUiDataLabel(UiKey.ButtonConfirmation),
          disabled: isLoading,
          loading: isLoadingComponent,
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
