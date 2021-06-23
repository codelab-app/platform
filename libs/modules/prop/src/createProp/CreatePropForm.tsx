import {
  /* refetchGetPropsQuery,
   * useCreatePropMutation,
   * useGetPropTypesQuery, */
  useGetValueTypesQuery,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  DisplayIf,
  EntityType,
  FormUniforms,
  isNotNull,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useState } from 'react'
import { DeepPartial } from 'uniforms'
import { ListField, LongTextField, SelectField, TextField } from 'uniforms-antd'
import { CreatePropInput, createPropSchema } from './createPropSchema'

type CreatePropFormProps = UniFormUseCaseProps<CreatePropInput>
type SelectFieldOptions = Array<{
  value: string
  label: string
}>

export const CreatePropForm = ({ ...props }: CreatePropFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Prop)
  // Only Editors can modify Props (dgraph permissions?)
  /* const [mutate, { loading: creating }] = useCreatePropMutation({
   *   awaitRefetchQueries: true,
   *   refetchQueries: [refetchGetPropsQuery()],
   * }) */
  /* useEffect(() => {
   *     setLoading(creating)
   * }, [creating]) */
  const { data: valueTypesData, loading } = useGetValueTypesQuery({})
  const [enumItems, setEnumItems] = useState<SelectFieldOptions>([])

  if (loading) {
    return <Spin />
  }

  const valueTypes = valueTypesData?.valueTypes?.filter(isNotNull) ?? []

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

  const labelCol = { span: 5 }

  return (
    <FormUniforms<CreatePropInput>
      onSubmit={onSubmit}
      schema={createPropSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating prop',
      })}
      onSubmitSuccess={() => reset()}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore https://github.com/vazco/uniforms/issues/951
      layout="horizontal"
      onChangeModel={(model) => {
        if (model.type === 'Enum') {
          const nextEnumItems =
            model?.enum
              ?.filter(
                (enumItem): enumItem is CreatePropInput['enum'][number] =>
                  typeof enumItem?.value === 'string' &&
                  enumItem.value.length > 0,
              )
              .map((enumItem) => ({
                label: enumItem.value,
                value: enumItem.value,
              })) ?? []

          setEnumItems(nextEnumItems)
        }
      }}
      {...props}
    >
      <TextField
        name="key"
        label="Key"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        labelCol={labelCol}
        colon={false}
      />
      <LongTextField
        name="description"
        label="Description"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        labelCol={labelCol}
        colon={false}
      />
      <SelectField
        name="component"
        label="Component"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        labelCol={labelCol}
        colon={false}
        options={componentTypes?.map((componentType) => ({
          label: componentType.label,
          value: componentType.name,
        }))}
      />
      <SelectField
        name="type"
        label="Type"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        labelCol={labelCol}
        colon={false}
        options={valueTypes?.map((valueType) => ({
          label: valueType.label,
          value: valueType.type,
        }))}
      />

      <DisplayIf condition={(context) => context.model.type !== 'Enum'}>
        <TextField
          name="default"
          label="Default"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          labelCol={labelCol}
          colon={false}
        />
      </DisplayIf>
      <DisplayIf condition={(context) => context.model.type === 'Enum'}>
        <ListField
          name="enum"
          label="Enum"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          labelCol={labelCol}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          colon={false}
          initialCount={1}
          itemProps={{
            colon: false,
          }}
        />
      </DisplayIf>
      <DisplayIf condition={(context) => context.model.type === 'Enum'}>
        <SelectField
          name="default"
          label="default"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          showSearch={true}
          optionFilterProp="label"
          labelCol={labelCol}
          colon={false}
          options={enumItems}
        />
      </DisplayIf>
    </FormUniforms>
  )
}
