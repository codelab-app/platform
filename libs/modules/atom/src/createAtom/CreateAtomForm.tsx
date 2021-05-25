import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  isNotNull,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetAtomsQuery,
  useCreateAtomMutation,
  useGetAtomTypesQuery,
} from '@codelab/graphql'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { SelectField } from 'uniforms-antd'
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

  const { data, loading } = useGetAtomTypesQuery({})

  if (loading) {
    return <Spin />
  }

  const atomTypes = data?.atomTypes?.filter(isNotNull) ?? []

  const onSubmit = (submitData: CreateAtomInput) => {
    return mutate({
      variables: {
        input: {
          type: {
            id: submitData.type,
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
    <FormUniforms<CreateAtomInput>
      onSubmit={onSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore https://github.com/vazco/uniforms/issues/951
      layout="horizontal"
      {...props}
    >
      {/* <SelectField
            name="library_id"
            label="Library"
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore https://github.com/vazco/uniforms/issues/951
            showSearch={true}
            optionFilterProp="label"
            options={libraries?.map((library) => ({
            label: library.name,
            value: library.id,
            }))}
            /> */}

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
