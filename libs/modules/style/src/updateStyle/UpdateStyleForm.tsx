import {
  refetchGetStyleQuery,
  useUpdateStyleMutation,
} from '@codelab/codegen/hasura'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import React from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { UpdateStyleInput, UpdateStyleSchema } from './updateStyleSchema'

export const UpdateStyleForm = (
  props: UniFormUseCaseProps<UpdateStyleInput>,
) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.Style)
  const { updateId: updateStyleId } = state

  const [mutate, { loading: updating }] = useUpdateStyleMutation({
    refetchQueries: [refetchGetStyleQuery()],
  })
  //
  // useEffect(() => {
  //   setLoading(updating)
  // }, [updating])
  //
  // const { data, loading } = useGetStyleQuery({
  //   variables: {
  //     styleId: updateStyleId,
  //   },
  // })

  // const style = data?.style_by_pk
  //
  // if (loading) {
  //   return <Spin />
  // }

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
    // return mutate({
    //   variables: {
    //     input: {
    //       ...(submitData as any),
    //       id: updateStyleId,
    //     },
    //     styleId: updateStyleId,
    //   },
    // })
  }

  return (
    <FormUniforms<UpdateStyleInput>
      onSubmit={onSubmit}
      schema={UpdateStyleSchema}
      // model={{ name: style?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating style',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
