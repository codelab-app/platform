import {
  EmptyJsonSchemaType,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'

type DeleteComponentFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentsForm = (props: DeleteComponentFormProps) => {
  return null
  // const {
  //   reset,
  //   setLoading,
  //   state: { deleteIds: deleteComponentIds },
  // } = useCrudModalForm(EntityType.Component)
  //
  // const [deleteComponents, { loading: deleting }] = useDeleteComponentMutation({
  //   awaitRefetchQueries: true,
  //   refetchQueries: [refetchLibraryExplorerQuery()],
  // })
  //
  // const filter = {
  //   id: deleteComponentIds,
  // }
  //
  // useEffect(() => {
  //   setLoading(deleting)
  // }, [deleting])
  //
  // const { data, loading } = useGetComponentsQuery({ variables: { filter } })
  //
  // if (loading) {
  //   return <Spin />
  // }
  //
  // const onSubmit = () => {
  //   return deleteComponents({ variables: { filter } })
  // }
  //
  // const componentLabels = data?.components
  //   ?.filter((c): c is Component => !!c)
  //   .map((component) => component.label)
  //   .join(', ')
  //
  // return (
  //   <FormUniforms<EmptyJsonSchemaType>
  //     data-testid="delete-component-form"
  //     id="delete-component-form"
  //     onSubmit={onSubmit}
  //     schema={emptyJsonSchema}
  //     onSubmitError={createNotificationHandler({
  //       title: 'Error while deleting component',
  //     })}
  //     onSubmitSuccess={() => reset()}
  //     {...props}
  //   >
  //     <h4>Are you sure you want to delete component "{componentLabels}"?</h4>
  //     <AutoFields />
  //   </FormUniforms>
  // )
}
