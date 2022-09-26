import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { PropsForm, PropsFormProps } from './PropsForm'

type ModalPropsFormProps = React.PropsWithChildren<PropsFormProps>

export const ModalPropsForm = observer((props: ModalPropsFormProps) => {
  const { submitRef, setIsLoading } = useContext(ModalForm.ModalFormContext)

  return (
    <PropsForm
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      setIsLoading={setIsLoading}
      submitField={React.Fragment}
      submitRef={submitRef}
    />
  )
})
