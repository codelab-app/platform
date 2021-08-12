import {
  EntityType,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { DeleteLibraryInput } from './deleteLibrarySchema'

type DeleteLibraryFormProps = UniFormUseCaseProps<DeleteLibraryInput>

export const DeleteLibraryForm = (props: DeleteLibraryFormProps) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.Library)
  const { deleteIds: deleteLibraryIds } = state

  // const [mutate, { loading: deleting }] = useDeleteLibraryMutation({
  //   refetchQueries: [refetchLibraryExplorerQuery()],
  // })
  //
  // useEffect(() => {
  //   setLoading(deleting)
  // }, [deleting])
  //
  // const { data, loading } = useGetLibraryQuery({
  //   variables: {
  //     libraryId: deleteLibraryIds[0],
  //   },
  // })

  // const library = data?.library_by_pk
  //
  // if (loading) {
  //   return <Spin />
  // }
  //
  // const onSubmit = () => {
  //   return mutate({
  //     variables: {
  //       libraryId: deleteLibraryIds[0],
  //     },
  //   })
  // }

  return null
  // <FormUniforms<DeleteLibraryInput>
  //   // onSubmit={onSubmit}
  //   schema={DeleteLibrarySchema}
  //   onSubmitError={createNotificationHandler({
  //     title: 'Error while deleting library',
  //   })}
  //   onSubmitSuccess={() => reset()}
  //   {...props}
  // >
  //   {/* <h4>Are you sure you want to delete library "{library?.name}"?</h4>*/}
  //   <AutoFields />
  // </FormUniforms>
}
