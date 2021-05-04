import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  LibraryContext,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetAtomsListGql,
  useCreateAtomMutation,
  useGetAtomsTypesQuery,
} from '@codelab/hasura'
import _ from 'lodash'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { SelectField } from 'uniforms-antd'
import { CreateAtomInput, createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Atom)
  const { libraries } = useContext(LibraryContext)

  // Only Editors can modify Atoms
  const [mutate, { loading: creating }] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAtomsListGql,
      },
    ],
    context: {
      headers: {
        'X-Hasura-Role': 'admin',
      },
    },
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: DeepPartial<CreateAtomInput>) => {
    return mutate({
      variables: {
        data: {
          library_id: submitData.library_id,
          atom_type_id: submitData.atom_type_id,
        },
      },
    })
  }

  const { data } = useGetAtomsTypesQuery()

  const atomTypesOptions = _.chain(data?.atom_type)
    .map((t) => ({
      label: t.label,
      value: t.label,
    }))
    .orderBy('label')
    .value()

  return (
    <FormUniforms<CreateAtomInput>
      data-testid="create-atom-form"
      id="create-atom-form" // We need both this and testid, because the generated dropdown has id based on this id, and we use it to identify the options when testing
      onSubmit={onSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField
        name="library_id"
        options={libraries?.map((library) => ({
          label: library.name,
          value: library.id,
        }))}
      />
      <SelectField name="type" options={atomTypesOptions} />
    </FormUniforms>
  )
}
