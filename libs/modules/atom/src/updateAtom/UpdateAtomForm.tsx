import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  JsonSchemaUniForm,
  PropsWithIds,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { UpdateAtomInput, UpdateAtomSchema } from './updateFromSchema'
import {
  GetAtomGql,
  useUpdateAtomMutation,
  useGetAtomQuery,
  useGetAtomsTypesQuery,
} from '@codelab/hasura'
import { DeepPartial } from 'uniforms'
import { SelectField } from 'uniforms-antd'
import { Spin } from 'antd'

export const UpdateAtomForm = ({
  ...props
}: UniFormUseCaseProps<UpdateAtomInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)
  const { id: atomId } = state

  const { data: atomsTypes } = useGetAtomsTypesQuery()
  const atomTypesOptions = atomsTypes?.atom_type?.map((t) => ({
    ...t,
    label: t.value,
  }))
  const [mutate, { loading: updating }] = useUpdateAtomMutation({
    refetchQueries: [
      {
        query: GetAtomGql,
        variables: {
          atomId,
        },
      },
    ],
  })
  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetAtomQuery({
    variables: {
      atomId,
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
          ...(submitData as any),
          id: atomId,
        },
        atomId,
      },
    })
  }

  return (
    <JsonSchemaUniForm<UpdateAtomInput>
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
    </JsonSchemaUniForm>
  )
}
