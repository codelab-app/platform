import {
  refetchGetAtomsQuery,
  useCreateAtomMutation,
  useGetAtomTypesQuery,
} from '@codelab/dgraph'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { SelectField } from 'uniforms-antd'
import { CreateAtomInput, createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Atom)
  /* const { libraries } = useContext(LibraryContext) */

  // Only Editors can modify Atoms (dgraph permissions?)
  const [mutate, { loading: creating }] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAtomsQuery()],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const { data, loading } = useGetAtomTypesQuery({})

  const isNotNull = <T extends Record<string, unknown>>(
    input: null | T,
  ): input is T => {
    return input !== null
  }

  const atomTypes = data?.atomTypes?.filter(isNotNull) ?? []

  const onSubmit = (submitData: DeepPartial<CreateAtomInput>) => {
    return mutate({
      variables: {
        input: {
          label: submitData.label as string,
          type: submitData.type as string,
        },
      },
    })
  }

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  if (loading) {
    return <Spin />
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
          value: atomType.type,
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
