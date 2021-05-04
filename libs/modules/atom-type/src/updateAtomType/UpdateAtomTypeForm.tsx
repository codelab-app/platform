import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetAtomTypeGql,
  useGetAtomTypeQuery,
  useUpdateAtomTypeMutation,
} from '@codelab/hasura'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoField } from 'uniforms-antd'
import {
  UpdateAtomTypeInput,
  updateAtomTypeSchema,
} from './updateAtomTypeSchema'

export const UpdateAtomTypeForm = (
  props: UniFormUseCaseProps<UpdateAtomTypeInput>,
) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.AtomType)
  const updateAtomTypeId = state.updateId

  const [mutate, { loading: updating }] = useUpdateAtomTypeMutation({
    refetchQueries: [
      {
        query: GetAtomTypeGql,
        variables: {
          atomTypeId: updateAtomTypeId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const onSubmit = (submitData: DeepPartial<UpdateAtomTypeInput>) => {
    return mutate({
      variables: {
        input: {
          label: submitData.label,
        },
        atomTypeId: updateAtomTypeId,
      },
    })
  }

  const { data, loading } = useGetAtomTypeQuery({
    variables: {
      atomTypeId: updateAtomTypeId,
    },
  })

  return (
    <FormUniforms<UpdateAtomTypeInput>
      data-testid="update-atomType-form"
      id="update-atomType-form"
      onSubmit={onSubmit}
      schema={updateAtomTypeSchema}
      model={{ label: data?.atom_type_by_pk?.label }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating AtomType',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoField label="Label" name="label" />
    </FormUniforms>
  )
}
