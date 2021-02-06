import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { AppContext } from '../../apps/AppProvider'
import { CreatePageForm } from './CreatePageForm'
import { pageFormState } from './pageFormState'
import { ModalForm } from '@codelab/frontend'

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
