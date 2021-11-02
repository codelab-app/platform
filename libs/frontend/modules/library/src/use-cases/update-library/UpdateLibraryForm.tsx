import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { UpdateLibraryInput, UpdateLibrarySchema } from './updateLibrarySchema'

type UpdateLibraryFormProps = UniFormUseCaseProps<UpdateLibraryInput>

export const UpdateLibraryForm = (props: UpdateLibraryFormProps) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.Library)
  const { updateId: updateLibraryId } = state

  // const [mutate, { loading: updating }] = useUpdateLibraryMutation({
  //   refetchQueries: [
  //     refetchGetLibraryQuery({
  //       libraryId: updateLibraryId,
  //     }),
  //   ],
  // })

  // useEffect(() => {
  //   setLoading(updating)
  // }, [updating])

  // const { data, loading } = useGetLibraryQuery({
  //   variables: {
  //     libraryId: updateLibraryId,
  //   },
  // })
  //
  // const library = data?.library_by_pk
  // const { user } = useUser()
  // const userId = user?.sub
  //
  // if (loading) {
  //   return <Spin />
  // }

  const onSubmit = (submitData: DeepPartial<UpdateLibraryInput>) => {
    //
  }

  return (
    <FormUniforms<UpdateLibraryInput>
      onSubmit={onSubmit}
      schema={UpdateLibrarySchema}
      // model={{ name: library?.name ?? '' }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating library',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
