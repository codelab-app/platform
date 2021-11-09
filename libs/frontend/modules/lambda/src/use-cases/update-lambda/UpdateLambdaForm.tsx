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
import { LambdaFragment } from '../../Lambda.fragment.graphql.gen'
import { lambdaState } from '../../state'
import { useGetLambdaQuery, useUpdateLambdaMutation } from '../lambda.endpoints'
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

  const [mutate, { isLoading: updateLambdaLoading }] = useUpdateLambdaMutation(
    {},
  )

  const [, setLambdaState] = useRecoilState(lambdaState)

  const { data, isLoading } = useGetLambdaQuery({
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
