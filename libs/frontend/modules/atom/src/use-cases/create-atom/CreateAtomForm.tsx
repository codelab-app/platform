import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  AtomType,
  CreateAtomInput,
  refetchGetAtomsQuery,
  refetchGetTypesQuery,
  useCreateAtomMutation,
} from '@codelab/shared/codegen/graphql'
import React from 'react'
import { AutoField, SelectField } from 'uniforms-antd'
import { createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm({
    entityType: EntityType.Atom,
    useMutationFunction: useCreateAtomMutation,
    mutationOptions: {
      refetchQueries: [refetchGetAtomsQuery(), refetchGetTypesQuery()],
    },
    mapVariables: ({ name, type }: CreateAtomInput) => ({
      input: { name, type },
    }),
  })

  return (
    <FormUniforms<CreateAtomInput>
      onSubmit={handleSubmit}
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
      <AutoField name="name" />
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
