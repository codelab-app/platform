import { ModalForm } from '@codelab/frontend/shared'
import React from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { CreateLambdaForm } from './CreateLambdaForm'
import { createLambdaState } from './CreateLambdaState'

export const CreateLambdaModal = () => {
  const [createLambda, setCreateLambda] = useRecoilState(createLambdaState)

  return (
    <ModalForm
      modalProps={{
        visible: createLambda.visible,
        onCancel: () => setCreateLambda({ visible: false }),
      }}
      renderForm={() => (
        <CreateLambdaForm
          onSubmitSuccess={() => setCreateLambda({ visible: false })}
        >
          <AutoFields />
        </CreateLambdaForm>
      )}
    />
  )
}
