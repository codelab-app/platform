import React, { useContext } from 'react'
import {
  AppContext,
  createNotificationHandler,
  FormUseCaseProps,
  FormUniforms,
} from '@codelab/frontend/shared'
import { GetLambdasByLibraryId, useCreateLambdaMutation } from '@codelab/hasura'
import { CreateLambdaInput, createLambdaSchema } from './createLambdaSchema'
import { DeepPartial } from 'uniforms'
import { useSelectedLibrary } from '@codelab/modules/library'

export const CreateLambdaForm = (props: FormUseCaseProps<any>) => {
  const { library } = useSelectedLibrary()

  const [mutate] = useCreateLambdaMutation({
    refetchQueries: [
      {
        query: GetLambdasByLibraryId,
        variables: {
          libraryId: library?.id,
        },
      },
    ],
  })

  const onSubmit = (submitData: DeepPartial<CreateLambdaInput>) => {
    return mutate({
      variables: {
        input: {
          name: submitData.name as string,
          body: submitData.body as string,
          libraryId: library?.id,
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
