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
  JsonModelUpsertValueAdaptor,
  PropsJsonModelAdaptor,
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
    const adaptor = new JsonModelUpsertValueAdaptor(
      intface.fieldCollection.types,
      initialProps ? _.flatMap(initialProps, (p) => p.values) : undefined,
      initialProps ? _.flatMap(initialProps, (p) => p.props) : undefined,
    )

    const input = adaptor.convert(model as any, intface.fieldCollection.fields)

    console.log(input)

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
          ? (PropsJsonModelAdaptor.propsToModel(initialProps) as any)
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
