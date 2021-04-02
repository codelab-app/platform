import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { CreateAtomForm } from './CreateAtomForm'
import { atomFormState } from './atomFormState'
import { AppContext, ModalForm } from '@codelab/frontend/shared'

export const CreateAtomModal = () => {
  const [atomForm, setAtomForm] = useRecoilState(atomFormState)
  const { appId } = useContext(AppContext)

  return (
    <ModalForm
      modalProps={{
        okText: 'Register',
        okButtonProps: {},
        visible: atomForm.visible,
        onCancel: () => setAtomForm({ visible: false }),
        onOk: () => setAtomForm({ visible: false }),
      }}
      renderForm={() => <CreateAtomForm appId={appId} />}
    />
  )
}
