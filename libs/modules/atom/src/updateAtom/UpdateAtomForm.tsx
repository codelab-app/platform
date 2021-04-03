import React from 'react'
import {
  createNotificationHandler,
  JsonSchemaUniForm,
  PropsWithIds,
  UniFormUseCaseProps,
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

export const UpdateAtomForm = ({
  atomId,
  ...props
}: UniFormUseCaseProps<UpdateAtomInput> & PropsWithIds<'atomId'>) => {
  const { data: atomsTypes } = useGetAtomsTypesQuery()
  const atomTypesOptions = atomsTypes?.atom_type?.map((t) => ({
    ...t,
    label: t.value,
  }))
  const [mutate] = useUpdateAtomMutation({
    refetchQueries: [
      {
        query: GetAtomGql,
        variables: {
          atomId,
        },
      },
    ],
  })
  const { data, loading } = useGetAtomQuery({
    variables: {
      atomId,
    },
  })

  const atom = data?.atom_by_pk

  if (loading) {
    return null
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
      {...props}
    >
      <SelectField name="type" options={atomTypesOptions} />
    </JsonSchemaUniForm>
  )
}
