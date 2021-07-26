import { useCreateLambdaMutation } from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { useSelectedLibrary } from '@codelab/modules/library'
import React from 'react'
import { DeepPartial } from 'uniforms'
import { CreateLambdaInput, createLambdaSchema } from './createLambdaSchema'

export const CreateLambdaForm = (props: UniFormUseCaseProps<any>) => {
  const { reset, setLoading } = useCrudModalForm(EntityType.Lambda)
  const { library } = useSelectedLibrary()

  const [mutate] = useCreateLambdaMutation({
    // refetchQueries: [
    //   refetchGetLambdasByLibraryIdQuery({
    //     libraryId: library?.id ?? '',
    //   }),
    // ],
  })

  const onSubmit = (submitData: DeepPartial<CreateLambdaInput>) => {
    return mutate({
      variables: {
        input: {
          name: submitData.name as string,
          body: submitData.body as string,
        },
      },
    })
  }

  return (
    <FormUniforms<CreateLambdaInput>
      onSubmit={onSubmit}
      schema={createLambdaSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating lambda',
      })}
      {...props}
    />
  )
}
