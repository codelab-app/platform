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
import { lambdaState } from '../../state'
import { refetchGetLambdasQuery } from '../get-lambdas/GetLambdas.api.graphql.gen'
import { useCreateLambdaMutation } from './CreateLambda.api.graphql.gen'
import { CreateLambdaInput, createLambdaSchema } from './createLambdaSchema'

export const CreateLambdaForm = (props: UniFormUseCaseProps<any>) => {
  const { reset, setLoading } = useCrudModalForm(EntityType.Lambda)
  // const { library } = useSelectedLibrary()
  const [, setLambdaState] = useRecoilState(lambdaState)

  const [mutate, { loading }] = useCreateLambdaMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetLambdasQuery()],
  })

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setLoading(loading)
    setLambdaState((current) => ({ ...current, loading }))
  }, [setLoading, loading, setLambdaState])

  const onSubmit = (submitData: CreateLambdaInput) => {
    return mutate({
      variables: {
        input: {
          name: submitData.name,
          body: submitData.body,
        },
      },
    })
  }

  return (
    <FormUniforms<CreateLambdaInput>
      onSubmit={onSubmit}
      model={{ body: defaultLambdaBody }}
      schema={createLambdaSchema}
      onSubmitSuccess={() => reset()}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating lambda',
      })}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
