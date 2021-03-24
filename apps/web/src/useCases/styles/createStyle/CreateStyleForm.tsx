import React, { useContext } from 'react'
import { AppContext } from '../../apps/AppProvider'
import { reduceStyleProps } from '../reduceStyleProps'
import { ApolloForm } from '@codelab/frontend'
import {
  CreateStyleInputSchema,
  CreateStyleMutationVariables,
  GetStylesGql,
  useCreateStyleMutation,
} from '@codelab/generated'
import { FormUseCaseProps } from 'libs/frontend/src/components'

export const CreateStyleForm = (props: FormUseCaseProps<any>) => {
  const { appId } = useContext(AppContext)

  const [mutate] = useCreateStyleMutation({
    refetchQueries: [
      {
        query: GetStylesGql,
        variables: {
          input: {
            appId,
          },
        },
      },
    ],
  })

  // Reduce the array of key value css props to a simple object
  const transformedMutate: typeof mutate = (options) => {
    const reduced = reduceStyleProps(options?.variables?.input?.props)

    return mutate({
      ...options,
      variables: {
        ...options?.variables,
        input: {
          ...(options?.variables?.input as any),
          props: reduced,
        },
      },
    })
  }

  return (
    <ApolloForm<any, CreateStyleMutationVariables>
      initialFormData={{ appId, name: '' }}
      schema={CreateStyleInputSchema}
      uiSchema={{
        appId: {
          'ui:widget': 'hidden',
        },
      }}
      mutate={transformedMutate}
      hideSubmitButton
      idPrefix="create_style"
      {...props}
    />
  )
}
