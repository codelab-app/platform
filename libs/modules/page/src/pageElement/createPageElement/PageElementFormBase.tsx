import {
  createNotificationHandler,
  FormUniforms,
  FormUniformsProps,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import { useGetComponentsQuery } from '@codelab/hasura'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { UpdatePageElementInput } from '../updatePageElement/updatePageElementSchema'
import {
  CreatePageElementInput,
  createPageElementSchema,
} from './createPageElementSchema'

type PageElementFormBaseProps = UniFormUseCaseProps<
  CreatePageElementInput | UpdatePageElementInput
> &
  Pick<
    FormUniformsProps<CreatePageElementInput>,
    'onSubmit' | 'onSubmitSuccess' | 'model' | 'autosave' | 'autosaveDelay'
  >

/**
 * The base form for both CreatePageElementForm and UpdatePageElementForm
 */
export const PageElementFormBase = (props: PageElementFormBaseProps) => {
  const { data: componentsData } = useGetComponentsQuery()

  const componentOptions = componentsData?.component?.map((c) => ({
    value: c.id,
    label: c.label,
  }))

  return (
    <FormUniforms<CreatePageElementInput>
      schema={createPageElementSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page element',
      })}
      {...props}
    >
      <AutoFields omitFields={['component_id']} />
      <SelectField
        name="component_id"
        label="Component"
        options={componentOptions}
      />
    </FormUniforms>
  )
}
