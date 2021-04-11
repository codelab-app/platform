import React, { useContext } from 'react'
import {
  AppContext,
  createNotificationHandler,
  FormUseCaseProps,
  JsonSchemaUniForm,
} from '@codelab/frontend/shared'
import { GetLambdasByLibraryId, useCreateLambdaMutation } from '@codelab/hasura'
import { CreateLambdaInput, createLambdaSchema } from './createLambdaSchema'
import { DeepPartial } from 'uniforms'

export const CreateLambdaForm = (props: FormUseCaseProps<any>) => {
  const { appId } = useContext(AppContext)
  const [mutate] = useCreateLambdaMutation({
    refetchQueries: [
      {
        query: GetLambdasByLibraryId,
        variables: {
          libraryId: 'f70c9584-4b68-4999-a42e-1755d539b714',
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
          libraryId: 'f70c9584-4b68-4999-a42e-1755d539b714',
        },
      },
    })
  }

  return (
    <JsonSchemaUniForm<CreateLambdaInput>
      onSubmit={onSubmit}
      schema={createLambdaSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating lambda',
      })}
      {...props}
    />
  )
}
