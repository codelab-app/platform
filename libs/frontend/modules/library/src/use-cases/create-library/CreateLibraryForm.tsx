import { UniFormUseCaseProps } from '@codelab/frontend/view/components'
import { CreateLibraryInput } from './createLibrarySchema'

type CreateLibraryFormProps = UniFormUseCaseProps<CreateLibraryInput>

export const CreateLibraryForm = ({ ...props }: CreateLibraryFormProps) => {
  return null
  // const [mutate, { loading: creating }] = useCreateLibraryMutation({
  //   awaitRefetchQueries: true,
  //   refetchQueries: [refetchLibraryExplorerQuery()],
  // })
  //
  // useEffect(() => {
  //   setLoading(creating)
  // }, [creating])
  //
  // const onSubmit = (submitData: CreateLibraryInput) => {
  //   if (!user?.email) {
  //     throw new Error('Missing user email')
  //   }
  //
  //   return mutate({
  //     variables: {
  //       input: {
  //         name: submitData.name,
  //         ownerId: user?.email,
  //       },
  //     },
  //   })
  // }
  //
  // return (
  //   <FormUniforms<CreateLibraryInput>
  //     onSubmit={onSubmit}
  //     schema={createLibrarySchema}
  //     onSubmitError={createNotificationHandler({
  //       title: 'Error while creating library',
  //     })}
  //     onSubmitSuccess={() => reset()}
  //     {...props}
  //   >
  //     <AutoFields />
  //   </FormUniforms>
  // )
}
