import {
  Lambda,
  refetchGetLambdasByLibraryIdQuery,
  useUpdateLambdaMutation,
} from '@codelab/codegen/hasura'
import {
  createNotificationHandler,
  FormUniforms,
} from '@codelab/frontend/shared'
import React from 'react'
import { useRecoilState } from 'recoil'
import { DeepPartial } from 'uniforms'
import { UpdateLambdaInput, updateLambdaSchema } from './updateLambdaSchema'
import { updateLambdaState } from './UpdateLambdaState'

type UpdateLambdaFormProps = {
  lambda: Lambda
}

export const UpdateLambdaForm = ({
  lambda,
  ...props
}: UpdateLambdaFormProps) => {
  const [mutate] = useUpdateLambdaMutation({
    refetchQueries: [
      refetchGetLambdasByLibraryIdQuery({
        libraryId: 'f70c9584-4b68-4999-a42e-1755d539b714',
      }),
    ],
  })

  const [updateLambda, setUpdateLambda] = useRecoilState(updateLambdaState)

  if (!lambda) {
    return null
  }

  const onSubmit = (submitData: DeepPartial<UpdateLambdaInput>) => {
    return mutate({
      variables: {
        name: submitData.name as string,
        body: submitData.body as string,
        id: updateLambda.lambdaId,
      },
    })
  }

  return (
    <FormUniforms<UpdateLambdaInput>
      onSubmit={onSubmit}
      schema={updateLambdaSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating lambda',
      })}
      model={{ name: updateLambda.name, body: updateLambda.body }}
      {...props}
    />
  )
}
