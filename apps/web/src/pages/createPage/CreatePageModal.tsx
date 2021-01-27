import React from 'react'
import { useRecoilState } from 'recoil'
import { CreatePageForm } from './CreatePageForm'
import { pageFormState } from './pageFormState'
import { ModalForm } from '@codelab/frontend'

export const CreatePageModal = () => {
  const [pageForm, setPageForm] = useRecoilState(pageFormState)

  return (
    <ModalForm
      modalProps={{
        okText: 'Register',
        okButtonProps: {},
        visible: pageForm.visible,
        onCancel: () => setPageForm({ visible: false }),
        onOk: () => setPageForm({ visible: false }),
      }}
      renderForm={() => <CreatePageForm />}
    />
  )
}
