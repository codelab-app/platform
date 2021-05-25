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
  useGetAtomTypesQuery,
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

  const { data: atomTypesData, loading: atomTypesLoading } =
    useGetAtomTypesQuery({})

  if (getAtomLoading || atomTypesLoading) {
    return <Spin />
  }

  const onSubmit = (submitData: UpdateAtomInput) => {
    return mutate({
      variables: {
        input: {
          atomId: updateAtomId,
          updateData: {
            type: {
              id: submitData.type,
            },
          },
        },
      },
    })
  }

  const atomTypes = atomTypesData?.atomTypes?.filter(isNotNull) ?? []

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

  console.log('!!!!!!!!!!!!!!!!', atom?.type?.id)

  return (
    <FormUniforms<UpdateAtomInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={onSubmit}
      schema={updateAtomSchema}
      model={{ type: atom?.type?.id }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField
        name="type"
        label="Type"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        labelCol={{ span: 3 }}
        colon={false}
        options={atomTypes?.map((atomType) => ({
          label: atomType.label,
          value: atomType.id,
        }))}
      />
      <SelectField
        name="props"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        allowClear
        mode="multiple"
        optionFilterProp="label"
        colon={false}
        labelCol={{ span: 3 }}
        options={availableProps?.map((prop) => ({
          label: prop.name,
          value: prop.id,
        }))}
      />
    </FormUniforms>
  )
}
