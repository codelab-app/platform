import React, { useContext } from 'react'
import { SelectWidget } from '../../../widgets/SelectWidget'
import { reduceStyleProps } from '../reduceStyleProps'
import {
  ApolloForm,
  AppContext,
  FormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  CreateStyleInputSchema,
  CreateStyleMutationVariables,
  GetStylesGql,
  useCreateStyleMutation,
} from '@codelab/generated'

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

  const widgets = {
    SelectWidget: SelectWidget,
  }

  return (
    <ApolloForm<any, CreateStyleMutationVariables>
      initialFormData={{ appId, name: '' }}
      schema={CreateStyleInputSchema}
      widgets={widgets}
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
