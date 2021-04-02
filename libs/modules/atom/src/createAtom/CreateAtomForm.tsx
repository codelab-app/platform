import React from 'react'
import {
  createNotificationHandler,
  JsonSchemaUniForm,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'

import {
  GetAtomsListGql,
  useCreateAtomMutation,
  useGetAtomsTypesQuery,
} from '@codelab/hasura'
import { createAtomSchema, CreateAtomInput } from './createAtomSchema'
import { DeepPartial } from 'uniforms'
import { SelectField } from 'uniforms-antd'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const [mutate] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAtomsListGql,
      },
    ],
  })

  const onSubmit = (submitData: DeepPartial<CreateAtomInput>) => {
    return mutate({
      variables: {
        data: {
          ...(submitData as any),
        },
      },
    })
  }
  const { data } = useGetAtomsTypesQuery()
  const atomTypesOptions = data?.atom_type?.map((t) => ({
    ...t,
    label: t.value,
  }))

  return (
    <JsonSchemaUniForm<CreateAtomInput>
      onSubmit={onSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      {...props}
    >
      <SelectField name="type" options={atomTypesOptions} />
    </JsonSchemaUniForm>
  )
}
