import {
  createNotificationHandler,
  FormUniforms,
  FormUniformsProps,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import { useGetAtomsListQuery } from '@codelab/hasura'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import {
  CreateComponentElementInput,
  createComponentElementSchema,
} from './createComponentElementSchema'

type CreateComponentElementFormProps =
  UniFormUseCaseProps<CreateComponentElementInput> &
    Pick<
      FormUniformsProps<CreateComponentElementInput>,
      'onSubmit' | 'onSubmitSuccess' | 'model' | 'autosave' | 'autosaveDelay'
    >

/**
 * The base form for both CreateComponentElementForm and CreateLinkedComponentElementForm
 */
export const CreateComponentElementFormBase = ({
  ...props
}: CreateComponentElementFormProps) => {
  const { data: atomsData } = useGetAtomsListQuery()

  const atomOptions = atomsData?.atom?.map((t) => ({
    value: t.id,
    label: t.type.label,
    // type: t.type.id,
  }))

  return (
    <FormUniforms<CreateComponentElementInput>
      schema={createComponentElementSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating component element',
      })}
      {...props}
    >
      <SelectField name="atom_id" label="Atom" options={atomOptions} />
    </FormUniforms>
  )
}
