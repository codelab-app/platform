import { IField, IPropsFieldContext } from '@codelab/shared/abstract/core'
import { Input, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useQuery } from 'react-query'
import { interfaceFormApi } from '../../store'

export const useGetAllComponents = () => {
  const { data, isLoading, error } = useQuery(
    'interface-form/select-component',
    () =>
      interfaceFormApi.InterfaceForm_GetComponents({
        where: { name_NOT_CONTAINS: 'Hook' },
      }),
  )

  const options =
    data?.components.map((c) => ({
      label: c.name,
      value: c.id,
    })) ?? []

  return { data, options, isLoading, error }
}

export interface SelectComponentFieldProps {
  field: IField
  form: UseFormReturn
  context?: IPropsFieldContext
}

/**
 * We use 2 separate Controller to provide
 *
 * `[propName].type` & `[propName].value` as seen by `TypeValue`
 */
export const SelectComponentField = observer(
  ({ field, form, context }: SelectComponentFieldProps) => {
    const { options, isLoading } = useGetAllComponents()

    console.log(field.key)

    /**
     * Need to exclude self so we don't have a recursive loop
     */
    const filteredOptions = options.filter(
      (option) => option.value !== context?.builderState.componentId,
    )

    return (
      <>
        <Controller
          control={form.control}
          /**
           * Sets the current nodeType's id
           */
          defaultValue={field.type.current.id}
          name={`${field.key}.type`}
          // eslint-disable-next-line react/jsx-no-useless-fragment
          render={(control) => (
            <Input
              disabled
              onBlur={control.field.onBlur}
              onChange={control.field.onChange}
              placeholder="NodeType"
              value={control.field.value}
            />
          )}
        />
        <Controller
          control={form.control}
          /**
           * Sets the reference to a componentId
           */
          name={`${field.key}.value`}
          render={(control) => {
            console.log(control.field.value)

            return (
              <Select
                allowClear
                loading={isLoading}
                onBlur={control.field.onBlur}
                onChange={control.field.onChange}
                optionFilterProp="label"
                options={filteredOptions}
                showSearch
                value={control.field.value}
              />
            )
          }}
        />
      </>
    )
  },
)
