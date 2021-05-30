import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
/* import {
 *   refetchGetPropsQuery,
 *   useGetPropQuery,
 *   useGetPropsQuery,
 *   useGetPropTypesQuery,
 *   useUpdatePropMutation,
 * } from '@codelab/graphql' */
import React from 'react'
import { SelectField, TextField } from 'uniforms-antd'
import { UpdatePropInput, updatePropSchema } from './updatePropSchema'

export const UpdatePropForm = (props: UniFormUseCaseProps<UpdatePropInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Prop)
  const { updateId: updatePropId } = state

  const onSubmit = (submitData: UpdatePropInput) => {
    //
  }

  const componentTypes = [
    {
      label: 'Button',
      name: 'Button',
    },
    {
      label: 'Div',
      name: 'div',
    },
  ]

  const valueTypes = [
    {
      label: 'String',
      name: 'string',
    },
    {
      label: 'Boolean',
      name: 'boolean',
    },
    {
      label: 'Number',
      name: 'number',
    },
  ]

  const labelCol = { span: 5 }

  return (
    <FormUniforms<UpdatePropInput>
      onSubmit={onSubmit}
      schema={updatePropSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating prop',
      })}
      onSubmitSuccess={() => reset()}
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore https://github.com/vazco/uniforms/issues/951
      layout="horizontal"
      {...props}
    >
      <TextField
        name="key"
        label="Key"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        labelCol={labelCol}
        colon={false}
      />
      <TextField
        name="description"
        label="Description"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        labelCol={labelCol}
        colon={false}
      />
      <SelectField
        name="type"
        label="Type"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        labelCol={labelCol}
        colon={false}
        options={valueTypes?.map((valueType) => ({
          label: valueType.label,
          value: valueType.name,
        }))}
      />
      <SelectField
        name="component"
        label="Component"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        labelCol={labelCol}
        colon={false}
        options={componentTypes?.map((componentType) => ({
          label: componentType.label,
          value: componentType.name,
        }))}
      />
      <TextField
        name="default"
        label="Default"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        labelCol={labelCol}
        colon={false}
      />
    </FormUniforms>
  )
}
