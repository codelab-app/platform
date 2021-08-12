import { useUser } from '@auth0/nextjs-auth0'
import {
  EntityType,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { CreateLibraryInput } from './createLibrarySchema'

type CreateLibraryFormProps = UniFormUseCaseProps<CreateLibraryInput>

export const CreateLibraryForm = ({ ...props }: CreateLibraryFormProps) => {
  const { reset, setLoading } = useCrudModalForm(EntityType.Library)
  const { user } = useUser()

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
