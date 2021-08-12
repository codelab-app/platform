import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import {
  Lambda,
  refetchGetLambdasQuery,
  UpdateLambdaInput,
  useGetLambdaQuery,
  useUpdateLambdaMutation,
} from '@codelab/shared/codegen/graphql'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { lambdaState } from '../../state'
import { updateLambdaSchema } from './updateLambdaSchema'

type UpdateLambdaFormProps = {
  lambda: Lambda
}

export const UpdateLambdaForm = (
  props: UniFormUseCaseProps<UpdateLambdaInput>,
) => {
  const {
    reset,
    setLoading,
    state: { updateId: updateLambdaId },
  } = useCrudModalForm(EntityType.Lambda)

  const [mutate, { loading: updateLambdaLoading }] = useUpdateLambdaMutation({
    refetchQueries: [refetchGetLambdasQuery()],
  })

  const [, setLambdaState] = useRecoilState(lambdaState)

  const { data, loading } = useGetLambdaQuery({
    variables: {
      input: {
        lambdaId: updateLambdaId,
      },
    },
  })

  const onSubmit = (submitData: UpdateLambdaInput) => {
    return mutate({
      variables: {
        input: {
          name: submitData.name,
          body: submitData.body,
          id: submitData.id,
        },
      },
    })
  }

  useEffect(() => {
    setLoading(updateLambdaLoading)
    setLambdaState((current) => ({ ...current, updateLambdaLoading }))
  }, [updateLambdaLoading])

  if (!data?.getLambda) {
    return null
  }

  return (
    <FormUniforms<UpdateLambdaInput>
      onSubmit={onSubmit}
      schema={updateLambdaSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating lambda',
      })}
      onSubmitSuccess={() => reset()}
      model={{
        ...data.getLambda,
      }}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
