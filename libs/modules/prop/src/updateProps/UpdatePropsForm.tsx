import * as Apollo from '@apollo/client'
import {
  __PropAggregateFragment,
  UpsertPropsInput,
  UpsertPropsMutation,
  UpsertPropsMutationVariables,
  useGetInterfaceQuery,
  useUpsertPropsMutation,
} from '@codelab/codegen/graphql'
import { createNotificationHandler } from '@codelab/frontend/shared'
import {
  InterfaceForm,
  InterfaceFormProps,
  jsonObjectToUpsertValueInput,
  propsToJsonObject,
} from '@codelab/modules/type'
import _ from 'lodash'
import React from 'react'

export interface UpdatePropsFormProps<TData>
  extends Omit<InterfaceFormProps<TData>, 'interface' | 'onSubmit'> {
  interfaceId: string
  initialProps?: Array<__PropAggregateFragment>
  extraInput?: Omit<UpsertPropsInput, 'value' | 'fieldId' | 'propId'>
  mutationOptions?: Apollo.MutationHookOptions<
    UpsertPropsMutation,
    UpsertPropsMutationVariables
  >
}

/** Not intended to be used in a modal */
export const UpdatePropsForm = <TData extends any>({
  interfaceId,
  initialProps,
  children,
  extraInput,
  mutationOptions,
  ...props
}: React.PropsWithChildren<UpdatePropsFormProps<TData>>) => {
  const { data } = useGetInterfaceQuery({
    variables: { input: { interfaceId } },
  })

  const [upsertProps, { loading }] = useUpsertPropsMutation(mutationOptions)
  const intface = data?.getInterface

  if (!intface) {
    return null
  }

  const handleSubmit = (model: TData) => {
    const input = jsonObjectToUpsertValueInput(
      model as any,
      intface.fieldCollection.fields,
      {
        types: intface.fieldCollection.types,
        existingProps: initialProps
          ? _.flatMap(initialProps, (p) => p.props)
          : undefined,
        existingValues: initialProps
          ? _.flatMap(initialProps, (p) => p.values)
          : undefined,
      },
    )

    return upsertProps({
      variables: { input: input.map((i) => ({ ...extraInput, ...i })) },
    })
  }

  return (
    <InterfaceForm<TData>
      interface={intface}
      onSubmit={handleSubmit}
      disabled={loading}
      model={
        initialProps
          ? (propsToJsonObject(initialProps, { forRendering: false }) as any)
          : ({} as any)
      }
      onSubmitError={props.onSubmitError || createNotificationHandler()}
      {...props}
    >
      {children}
    </InterfaceForm>
  )
}

UpdatePropsForm.displayName = 'UpdatePropsForm'
