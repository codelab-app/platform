import React from 'react'
import { useRecoilState } from 'recoil'
import { CreateLambdaForm } from './CreateLambdaForm'
import { createLambdaState } from './CreateLambdaState'
import { ModalForm } from '@codelab/frontend/shared'

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
        />
      )}
    />
  )
}
