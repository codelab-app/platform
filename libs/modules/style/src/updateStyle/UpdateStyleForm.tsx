import React, { useContext, useEffect } from 'react'
import { reduceStyleProps, reverseReduceStyleProps } from '../reduceStyleProps'
import {
  createNotificationHandler,
  EntityType,
  JsonSchemaUniForm,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { UpdateStyleInput, UpdateStyleSchema } from './updateStyleSchema'
import {
  GetStyleGql,
  useGetStyleQuery,
  useUpdateStyleMutation,
} from '@codelab/hasura'
import { Spin } from 'antd'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'

export const UpdateStyleForm = ({
  ...props
}: UniFormUseCaseProps<UpdateStyleInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Style)
  const { id: styleId } = state

  const [mutate, { loading: updating }] = useUpdateStyleMutation({
    refetchQueries: [
      {
        query: GetStyleGql,
        variables: {
          styleId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetStyleQuery({
    variables: {
      styleId,
    },
  })

  const style = data?.style_by_pk

  if (loading) {
    return <Spin />
  }

  // Reduce the array of key value css props to a simple object
  /* const transformedMutate: typeof mutate = (options) => {
     *   const reduced = reduceStyleProps(options?.variables?.input?.props)

     *   return mutate({
     *     ...options,
     *     variables: {
     *       ...options?.variables,
     *       input: {
     *         ...(options?.variables?.input as any),
     *         props: reduced,
     *       },
     *     },
     *   })
     * }
     */

  /* return (
   *   <ApolloForm<UpdateStyleInput, UpdateStyleMutationVariables>
   *     key={styleId}
   *     mutate={transformedMutate}
   *     hideSubmitButton
   *     schema={UpdateStyleInputSchema}
   *     uiSchema={{
   *       appId: {
   *         'ui:widget': 'hidden',
   *       },
   *       styleId: {
   *         'ui:widget': 'hidden',
   *       },
   *     }}
   *     initialFormData={{
   *       props: reverseReduceStyleProps(style?.props),
   *       name: style?.name || '',
   *       styleId,
   *     }}
   *     idPrefix="update_style"
   *     {...props}
   *   />
   * ) */

  const onSubmit = (submitData: DeepPartial<UpdateStyleInput>) => {
    return mutate({
      variables: {
        input: {
          ...(submitData as any),
          id: styleId,
        },
        styleId,
      },
    })
  }

  return (
    <JsonSchemaUniForm<UpdateStyleInput>
      onSubmit={onSubmit}
      schema={UpdateStyleSchema}
      model={{ name: style?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating style',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </JsonSchemaUniForm>
  )
}
