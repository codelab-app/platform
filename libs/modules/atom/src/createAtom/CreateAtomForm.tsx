import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
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
  const { reset, setLoading } = useCRUDModalForm(EntityType.Atom)

  const [mutate, { loading: creating }] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAtomsListGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

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
    type: t.value,
  }))

  return (
    <FormUniforms<CreateAtomInput>
      data-testid="create-atom-form"
      id="create-atom-form"
      onSubmit={onSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField name="type" options={atomTypesOptions} />
    </FormUniforms>
  )
}
