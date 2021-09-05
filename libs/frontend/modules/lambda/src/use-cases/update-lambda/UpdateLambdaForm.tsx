import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { LambdaFragment } from '../../graphql/Lambda.fragment.api.graphql.gen'
import { lambdaState } from '../../state'
import { useGetLambdaQuery } from '../get-lambda/GetLambda.api.graphql.gen'
import { refetchGetLambdasQuery } from '../get-lambdas/GetLambdas.api.graphql.gen'
import { useUpdateLambdaMutation } from './UpdateLambda.api.graphql.gen'
import { UpdateLambdaSchema, updateLambdaSchema } from './updateLambdaSchema'

type UpdateLambdaFormProps = {
  lambda: LambdaFragment
}

export const UpdateLambdaForm = (
  props: UniFormUseCaseProps<UpdateLambdaSchema>,
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

  const onSubmit = (submitData: UpdateLambdaSchema) => {
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
    <FormUniforms<UpdateLambdaSchema>
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
