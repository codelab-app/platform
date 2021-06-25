import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
/* import {
 *   refetchGetPropsQuery,
 *   useDeletePropMutation,
 * } from '@codelab/codegen/graphql' */
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeletePropInput, deletePropSchema } from './deletePropSchema'

type DeletePropFormProps = UniFormUseCaseProps<DeletePropInput>

export const DeletePropForm = (props: DeletePropFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Prop)
  const { deleteIds: propIds, metadata } = state

  /* const [mutate, { loading: deleting }] = useDeletePropMutation({
   *   awaitRefetchQueries: true,
   *   refetchQueries: [refetchGetPropsQuery()],
   * }) */

  /* useEffect(() => {
   *   setLoading(deleting)
   * }, [deleting]) */

  const onSubmit = () => {
    /* return mutate({
     *   variables: {
     *     input: {
     *       propId: propIds[0],
     *     },
     *   },
     * }) */
  }

  return (
    <FormUniforms<DeletePropInput>
      data-testid="delete-prop-form"
      id="delete-prop-form"
      onSubmit={onSubmit}
      schema={deletePropSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting prop',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete prop "{metadata?.type?.label}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
