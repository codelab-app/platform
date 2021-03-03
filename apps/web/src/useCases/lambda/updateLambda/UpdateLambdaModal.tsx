import React from 'react'
import { useRecoilState } from 'recoil'
import { UpdateLambdaForm } from './UpdateLambdaForm'
import { updateLambdaState } from './UpdateLambdaState'
import { ModalForm } from '@codelab/frontend'
import { useGetLambdaQuery } from '@codelab/generated'

export const UpdateLambdaModal = () => {
  const [updateLambda, setUpdateLambda] = useRecoilState(updateLambdaState)

  const { data, loading } = useGetLambdaQuery({
    variables: {
      input: {
        lambdaId: updateLambda.lambdaId,
      },
    },
  })

  return (
    <ModalForm
      modalProps={{
        visible: updateLambda.visible,
        onCancel: () => setUpdateLambda({ visible: false, lambdaId: '' }),
      }}
      renderForm={() => (
        <UpdateLambdaForm
          lambda={data?.getLambda}
          onSubmitSuccess={() =>
            setUpdateLambda({ visible: false, lambdaId: '' })
          }
        />
      )}
    />
  )
}
