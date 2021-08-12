// import {
//   refetchGetStylesListQuery,
//   useCreateStyleMutation,
// } from '@codelab/codegen/hasura'
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
import { CreateStyleInput, createStyleSchema } from './createStyleSchema'

type CreateStyleFormProps = UniFormUseCaseProps<CreateStyleInput>

export const CreateStyleForm = (props: CreateStyleFormProps) => {
  const { reset, setLoading } = useCrudModalForm(EntityType.Style)

  // const [mutate, { loading: creating }] = useCreateStyleMutation({
  //   refetchQueries: [refetchGetStylesListQuery()],
  // })
  //
  // useEffect(() => {
  //   setLoading(creating)
  // }, [creating])

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

  // const { library } = useSelectedLibrary()

  const onSubmit = (submitData: DeepPartial<CreateStyleInput>) => {
    // return mutate({
    //   variables: {
    //     data: {
    //       library_id: library?.id,
    //       ...(submitData as any),
    //     },
    //   },
    // })
  }

  return (
    <FormUniforms<CreateStyleInput>
      onSubmit={onSubmit}
      schema={createStyleSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
