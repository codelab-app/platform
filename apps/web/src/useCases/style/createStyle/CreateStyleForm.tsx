import React from 'react'
import { ApolloForm } from '@codelab/frontend'
import {
  CreateStyleInputSchema,
  CreateStyleMutationVariables,
  useCreateStyleMutation,
} from '@codelab/generated'
import { FormUseCaseProps } from 'libs/frontend/src/components'
import { CreateStyleInput } from 'libs/modules/style/src/core/application/useCases/createStyle/CreateStyleInput'

export const CreateStyleForm = ({
  ...props
}: FormUseCaseProps<CreateStyleInput>) => {
  const [mutate] = useCreateStyleMutation()

  return (
    <ApolloForm<CreateStyleInput, CreateStyleMutationVariables>
      initialFormData={{}}
      schema={CreateStyleInputSchema}
      mutate={mutate}
    />
  )
}
