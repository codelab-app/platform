import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  isNotNull,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
/* import {
 *   refetchGetPropsQuery,
 *   useCreatePropMutation,
 *   useGetPropTypesQuery,
 * } from '@codelab/graphql' */
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { SelectField, TextField } from 'uniforms-antd'
import { CreatePropInput, createPropSchema } from './createPropSchema'

type CreatePropFormProps = UniFormUseCaseProps<CreatePropInput>

export const CreatePropForm = ({ ...props }: CreatePropFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Prop)

  // Only Editors can modify Props (dgraph permissions?)
  /* const [mutate, { loading: creating }] = useCreatePropMutation({
   *   awaitRefetchQueries: true,
   *   refetchQueries: [refetchGetPropsQuery()],
   * }) */

  /* useEffect(() => {
     *   setLoading(creating)
     * }, [creating])

     * const { data, loading } = useGetPropTypesQuery({}) */

  /* if (loading) {
   *   return <Spin />
   * } */

  /* const propTypes = data?.propTypes?.filter(isNotNull) ?? [] */

  const onSubmit = (submitData: DeepPartial<CreatePropInput>) => {
    /* return mutate({
     *     variables: {
     *         input: {
     *             type: {
     *                 id: submitData.type,
     *             },
     *         },
     *     },
     * }) */
  }

  /* const availableProps = [
   *     {
   *         name: 'block',
   *         id: 'block',
   *     },
   *     {
   *         name: 'danger',
   *         id: 'danger',
   *     },
   *     {
   *         name: 'disabled',
   *         id: 'disabled',
   *     },
   *     {
   *         name: 'ghost',
   *         id: 'ghost',
   *     },
   * ] */

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
    <FormUniforms<CreatePropInput>
      onSubmit={onSubmit}
      schema={createPropSchema}
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
