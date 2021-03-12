import React, { useContext } from 'react'
import { AppContext } from '../../apps/AppProvider'
import { reduceStyleProps, reverseReduceStyleProps } from '../reduceStyleProps'
import { ApolloForm, FormUseCaseProps, PropsWithIds } from '@codelab/frontend'
import {
  GetStyleGql,
  GetStylesGql,
  UpdateStyleInput, UpdateStyleInputSchema, UpdateStyleInputUiSchema,
  UpdateStyleMutationVariables,
  useGetStyleQuery,
  useUpdateStyleMutation,
} from '@codelab/generated'

export const UpdateStyleForm = ({
  styleId,
  ...props
}: FormUseCaseProps<UpdateStyleInput> & PropsWithIds<'styleId'>) => {
  const { appId } = useContext(AppContext)

  const [mutate] = useUpdateStyleMutation({
    refetchQueries: [
      {
        query: GetStylesGql,
        variables: {
          input: {
            appId,
          },
        },
      },
      {
        query: GetStyleGql,
        variables: {
          input: {
            styleId,
          },
        },
      },
    ],
  })

  const { data, loading } = useGetStyleQuery({
    variables: {
      input: {
        styleId,
      },
    },
  })

  const style = data?.getStyle

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

  if (loading) {
    return null
  }

  return (
    <ApolloForm<UpdateStyleInput, UpdateStyleMutationVariables>
      key={styleId}
      mutate={transformedMutate}
      hideSubmitButton
      schema={UpdateStyleInputSchema}
      uiSchema={UpdateStyleInputUiSchema}
      initialFormData={{
        props: reverseReduceStyleProps(style?.props),
        name: style?.name || '',
        styleId,
      }}
      idPrefix="update_style"
      {...props}
    />
  )
}
