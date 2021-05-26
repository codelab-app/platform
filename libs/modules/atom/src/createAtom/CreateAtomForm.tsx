import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  isNotNull,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { refetchGetAtomsQuery, useCreateAtomMutation } from '@codelab/graphql'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { CreateAtomInput, createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Atom)

  // Only Editors can modify Atoms (dgraph permissions?)
  const [mutate, { loading: creating }] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAtomsQuery()],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: CreateAtomInput) => {
    return mutate({
      variables: {
        input: {
          label: submitData.label,
          type: submitData.type,
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
    <FormUniforms<CreateAtomInput>
      onSubmit={onSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore https://github.com/vazco/uniforms/issues/951
      layout="horizontal"
      {...props}
    >
      <AutoFields />
      {/* <SelectField
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
        }))} */}
    </FormUniforms>
  )
}
