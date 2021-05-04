import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetAtomGql,
  useGetAtomQuery,
  useGetAtomsTypesQuery,
  useUpdateAtomMutation,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { SelectField } from 'uniforms-antd'
import { UpdateAtomInput, updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomForm = (props: UniFormUseCaseProps<UpdateAtomInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)
  const { updateId: updateAtomId } = state
  const { data: atomsTypes } = useGetAtomsTypesQuery()

  const atomTypesOptions = atomsTypes?.atom_type?.map((t) => ({
    ...t,
    label: t.label,
    value: t.label,
  }))

  const [mutate, { loading: updating }] = useUpdateAtomMutation({
    refetchQueries: [
      {
        query: GetAtomGql,
        variables: {
          atomId: updateAtomId,
        },
      },
    ],
    context: {
      headers: {
        'X-Hasura-Role': 'admin',
      },
    },
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetAtomQuery({
    variables: {
      atomId: updateAtomId,
    },
  })

  const atom = data?.atom_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdateAtomInput>) => {
    return mutate({
      variables: {
        input: {
          atom_type_id: submitData.atom_type_id,
        },
        atomId: updateAtomId,
      },
    })
  }

  return (
    <FormUniforms<UpdateAtomInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={onSubmit}
      schema={updateAtomSchema}
      model={{ atom_type_id: atom?.type.id }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField name="type" options={atomTypesOptions} />
    </FormUniforms>
  )
}
