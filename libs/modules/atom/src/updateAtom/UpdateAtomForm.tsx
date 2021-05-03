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
import { UpdateAtomInput, UpdateAtomSchema } from './updateFromSchema'

export const UpdateAtomForm = ({
  ...props
}: UniFormUseCaseProps<UpdateAtomInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)
  const { updateId: updateAtomId } = state
  const { data: atomsTypes } = useGetAtomsTypesQuery()

  const atomTypesOptions = atomsTypes?.atom_type?.map((t) => ({
    ...t,
    label: t.value,
    type: t.value,
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
    console.log(submitData, updateAtomId)

    return mutate({
      variables: {
        input: {
          ...submitData,
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
      schema={UpdateAtomSchema}
      model={{ type: atom?.type }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField name="type" options={atomTypesOptions} />
    </FormUniforms>
  )
}
