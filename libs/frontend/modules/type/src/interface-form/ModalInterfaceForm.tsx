import { InterfaceForm } from '@codelab/frontend/modules/type'
import { ModalFormContext } from '@codelab/frontend/view/components'
import React, { useContext } from 'react'

export const ModalInterfaceForm = (props: any) => {
  const { submitRef, setIsLoading } = useContext(ModalFormContext)

  return (
    <InterfaceForm
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      setIsLoading={setIsLoading}
      submitRef={submitRef}
    />
  )
}
