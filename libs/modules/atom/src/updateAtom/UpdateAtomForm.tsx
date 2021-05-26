import {
  AtomType,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  isNotNull,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetAtomsQuery,
  useGetAtomQuery,
  useGetAtomsQuery,
  useUpdateAtomMutation,
} from '@codelab/graphql'
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
    refetchQueries: [refetchGetAtomsQuery()],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data: getAtomData, loading: getAtomLoading } = useGetAtomQuery({
    variables: {
      input: { atomId: updateAtomId },
    },
  })

  const atom = getAtomData?.atom

  if (getAtomLoading) {
    return <Spin />
  }

  const onSubmit = (submitData: UpdateAtomInput) => {
    return mutate({
      variables: {
        input: {
          atomId: updateAtomId,
          updateData: {
            type: submitData.type,
          },
        },
      },
    })
  }

  const availableProps = [
    {
      name: 'block',
      id: 'block',
    },
    {
      name: 'danger',
      id: 'danger',
    },
    {
      name: 'disabled',
      id: 'disabled',
    },
    {
      name: 'ghost',
      id: 'ghost',
    },
  ]

  return (
    <FormUniforms<UpdateAtomInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={onSubmit}
      schema={updateAtomSchema}
      model={{ type: atom?.type, label: atom?.label }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
