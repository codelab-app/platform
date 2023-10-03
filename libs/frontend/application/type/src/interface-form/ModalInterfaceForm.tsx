import { ModalForm } from '@codelab/frontend/presentation/view'
import React, { useContext } from 'react'
import { InterfaceForm } from './InterfaceForm'
import type { InterfaceFormProps } from './types'

type ModalInterfaceFormProps = React.PropsWithChildren<
  InterfaceFormProps<unknown, unknown>
>

export const ModalInterfaceForm = (props: ModalInterfaceFormProps) => {
  const { setIsLoading, submitRef } = useContext(ModalForm.ModalFormContext)

  return (
    <InterfaceForm
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      setIsLoading={setIsLoading}
      submitRef={submitRef}
    />
  )
}
