import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { useContext } from 'react'

import { InterfaceForm, type InterfaceFormProps } from './InterfaceForm'

type ModalInterfaceFormProps = React.PropsWithChildren<
  InterfaceFormProps<unknown, unknown>
>

export const ModalInterfaceForm = (props: ModalInterfaceFormProps) => {
  const { setIsLoading, submitRef } = useContext(ModalForm.ModalFormContext)

  return (
    <InterfaceForm
      {...props}
      setIsLoading={setIsLoading}
      submitRef={submitRef}
    />
  )
}
