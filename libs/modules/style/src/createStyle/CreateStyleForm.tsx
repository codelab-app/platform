import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { reduceStyleProps } from '../reduceStyleProps'
import {
  createNotificationHandler,
  EntityType,
  JsonSchemaUniForm,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { GetStylesListGql, useCreateStyleMutation } from '@codelab/hasura'
import { createStyleSchema, CreateStyleInput } from './createStyleSchema'
import { AutoFields } from 'uniforms-antd'

type CreateStyleFormProps = UniFormUseCaseProps<CreateStyleInput>

export const CreateStyleForm = (props: CreateStyleFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Style)

  const [mutate, { loading: creating }] = useCreateStyleMutation({
    refetchQueries: [
      {
        query: GetStylesListGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

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

  const onSubmit = (submitData: DeepPartial<CreateStyleInput>) => {
    return mutate({
      variables: {
        data: {
          ...(submitData as any),
        },
      },
    })
  }

  return (
    <JsonSchemaUniForm<CreateStyleInput>
      onSubmit={onSubmit}
      schema={createStyleSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </JsonSchemaUniForm>
  )
}
