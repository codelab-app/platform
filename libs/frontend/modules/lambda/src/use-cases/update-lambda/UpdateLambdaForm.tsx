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
import { defaultLambdaBody } from '../../defaultLambdBody'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'
import { lambdaState } from '../../state'
import { useGetLambdaQuery } from '../get-lambda/GetLambda.web.graphql.gen'
import { refetchGetLambdasQuery } from '../get-lambdas/GetLambdas.web.graphql.gen'
import { useUpdateLambdaMutation } from './UpdateLambda.web.graphql.gen'
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
  }, [setLambdaState, setLoading, updateLambdaLoading])

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
        body: data.getLambda.body || defaultLambdaBody,
      }}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
