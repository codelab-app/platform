import React from 'react'
import { useRecoilState } from 'recoil'
import { PropsWithIds } from '../../../../../libs/frontend/src/interfaces/PropsWithIds'
import { CreatePageForm } from './CreatePageForm'
import { pageFormState } from './pageFormState'
import { ModalForm } from '@codelab/frontend'

export const CreatePageModal = ({ appId }: PropsWithIds<'appId'>) => {
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
      renderForm={() => <CreatePageForm appId={appId} />}
    />
  )
}
