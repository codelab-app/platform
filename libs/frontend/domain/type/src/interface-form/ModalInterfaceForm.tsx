import { ModalForm } from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import { InterfaceForm } from './InterfaceForm'
import type { InterfaceFormProps } from './types'

type ModalInterfaceFormProps = React.PropsWithChildren<
  InterfaceFormProps<unknown, unknown>
>

export const ModalInterfaceForm = (props: ModalInterfaceFormProps) => {
  const { submitRef, setIsLoading } = useContext(ModalForm.ModalFormContext)

  return (
    <InterfaceForm
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      setIsLoading={setIsLoading}
      submitRef={submitRef}
    />
  )
}
