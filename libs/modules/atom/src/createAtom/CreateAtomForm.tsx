import {
  AtomType,
  refetchGetAtomsQuery,
  refetchGetTypesQuery,
  useCreateAtomMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import React, { useEffect } from 'react'
import { AutoField, SelectField } from 'uniforms-antd'
import { CreateAtomInput, createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Atom)

  // Only Editors can modify Atoms (dgraph permissions?)
  const [mutate, { loading: creating }] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAtomsQuery(), refetchGetTypesQuery()],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating, setLoading])

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

  console.log(
    Object.keys(AtomType).map((atomType) => ({
      label: atomType,
      value: atomType,
    })),
  )

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
      <AutoField name="label" />
      <SelectField
        name="type"
        label="Type"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        // labelCol={{ span: 3 }}
        // colon={false}
        options={Object.keys(AtomType).map((atomType) => ({
          label: atomType,
          value: atomType,
        }))}
      />
    </FormUniforms>
  )
}
