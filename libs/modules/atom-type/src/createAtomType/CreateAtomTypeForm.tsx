import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetAtomTypesQuery,
  useCreateAtomTypeMutation,
} from '@codelab/hasura'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoField } from 'uniforms-antd'
import {
  CreateAtomTypeInput,
  createAtomTypeSchema,
} from './createAtomTypeSchema'

type CreateATomTypeFormProps = UniFormUseCaseProps<CreateAtomTypeInput>

export const CreateAtomTypeForm = ({ ...props }: CreateATomTypeFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.AtomType)

  const [mutate, { loading: creating }] = useCreateAtomTypeMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAtomTypesQuery()],
    context: {
      headers: {
        'X-Hasura-Role': 'admin',
      },
    },
  })

  const onSubmit = (submitData: DeepPartial<CreateAtomTypeInput>) => {
    return mutate({
      variables: {
        input: {
          label: submitData.label,
        },
      },
    })
  }

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  return (
    <FormUniforms<CreateAtomTypeInput>
      data-testid="create-atom-form"
      id="create-atom-form" // We need both this and testid, because the generated dropdown has id based on this id, and we use it to identify the options when testing
      onSubmit={onSubmit}
      schema={createAtomTypeSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating AtomType',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoField label="Label" name="label" />
    </FormUniforms>
  )
}
