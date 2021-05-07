import {
  refetchGetAtomsQuery,
  useGetAtomsQuery,
  useUpdateAtomMutation,
} from '@codelab/dgraph'
import {
  AtomType,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields, SelectField } from 'uniforms-antd'
import { UpdateAtomInput, updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomForm = (props: UniFormUseCaseProps<UpdateAtomInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)
  const { updateId: updateAtomId } = state

  const [mutate, { loading: updating }] = useUpdateAtomMutation({
    refetchQueries: [
      {
        ...refetchGetAtomsQuery(),
        context: { graphqlUri: 'http://127.0.0.1:8081/graphql' },
      },
    ],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetAtomsQuery({
    variables: {
      filter: {
        id: updateAtomId as any,
      },
    },
  })

  const atom = data?.queryAtom ? data.queryAtom[0] : undefined

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdateAtomInput>) => {
    return mutate({
      variables: {
        input: {
          filter: {
            id: updateAtomId as any,
          },
          set: {
            label: submitData.label,
            type: submitData.type,
          },
        },
      },
    })
  }

  const atomTypesOptions = _.chain(Object.values(AtomType))
    .orderBy('label')
    .map((v) => ({ label: v, value: v }))
    .value()

  return (
    <FormUniforms<UpdateAtomInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={onSubmit}
      schema={updateAtomSchema}
      model={{ label: atom?.label, type: atom?.type }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField name="type" options={atomTypesOptions} />
      <AutoFields omitFields={['type']} />
    </FormUniforms>
  )
}
