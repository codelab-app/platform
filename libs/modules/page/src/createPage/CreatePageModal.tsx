import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { CreatePageForm } from './CreatePageForm'
import { pageFormState } from './pageFormState'
import { AppContext, ModalForm } from '@codelab/frontend/shared'

export const CreatePageModal = () => {
  const [pageForm, setPageForm] = useRecoilState(pageFormState)
  const { appId } = useContext(AppContext)

  return (
    <ModalForm
      modalProps={{
        okText: 'Register',
        okButtonProps: {},
        visible: pageForm.visible,
        onCancel: () => setPageForm({ visible: false }),
        onOk: () => setPageForm({ visible: false }),
      }}
      renderForm={() => <CreatePageForm appId={appId} />}
    />
  )
}
