import { refetchGetAtomsQuery, useCreateAtomMutation } from '@codelab/dgraph'
import {
  AtomType,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields, SelectField } from 'uniforms-antd'
import { CreateAtomInput, createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Atom)
  // const { libraries } = useContext(LibraryContext)

  // Only Editors can modify Atoms (dgraph permissions?)
  const [mutate, { loading: creating }] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        ...refetchGetAtomsQuery(),
        context: { graphqlUri: 'http://127.0.0.1:8081/graphql' },
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: DeepPartial<CreateAtomInput>) => {
    return mutate({
      variables: {
        input: {
          label: submitData.label as string,
          type: submitData.type as string,
          library: {},
        },
      },
    })
  }

  const atomTypesOptions = _.chain(Object.values(AtomType))
    .orderBy('label')
    .map((v) => ({ label: v, value: v }))
    .value()

  return (
    <FormUniforms<CreateAtomInput>
      onSubmit={onSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      {/*<SelectField*/}
      {/*  name="library_id"*/}
      {/*  options={libraries?.map((library) => ({*/}
      {/*    label: library.name,*/}
      {/*    value: library.id,*/}
      {/*  }))}*/}
      {/*/>*/}
      <SelectField name="type" options={atomTypesOptions} />
      <AutoFields omitFields={['type']} />
    </FormUniforms>
  )
}
