import { Modal } from 'antd'
import React, { useRef } from 'react'
import { useAppMachine } from '../../model'
import { CreateAppForm } from './CreateAppForm'
import { useRootMachine } from '@codelab/frontend'

const CREATE_APP_FORM = 'createAppForm'

export const CreateAppModal = () => {
  const root = useRootMachine()
  const app = useAppMachine()

  const submitBtnRef = useRef<HTMLButtonElement>()

  return (
    <Modal
      visible={typeof app.state.value.creatingApp !== 'undefined'}
      okText="Create App"
      okButtonProps={{
        htmlType: 'submit',
        form: CREATE_APP_FORM,
        onClick: () => submitBtnRef.current?.click(),
        loading: app.state.value?.creatingApp === 'submitting',
      }}
      onCancel={() => root.send('ON_MODAL_CANCEL')}
      onOk={() => root.send('ON_MODAL_OK')}
      destroyOnClose
    >
      <CreateAppForm
        formId={CREATE_APP_FORM}
        submitBtnRef={submitBtnRef as any}
      />
    </Modal>
  )
}
