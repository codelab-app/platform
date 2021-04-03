import React from 'react'
import { useRecoilState } from 'recoil'
import { CreateAtomForm } from './CreateAtomForm'
import { atomFormState } from './atomFormState'
import { ModalForm } from '@codelab/frontend/shared'

export const CreateAtomModal = () => {
  const [atomForm, setAtomForm] = useRecoilState(atomFormState)

  return (
    <ModalForm
      modalProps={{
        okText: 'Register',
        okButtonProps: {},
        visible: atomForm.visible,
        onCancel: () => setAtomForm({ visible: false }),
        onOk: () => setAtomForm({ visible: false }),
      }}
      renderForm={() => <CreateAtomForm />}
    />
  )
}
