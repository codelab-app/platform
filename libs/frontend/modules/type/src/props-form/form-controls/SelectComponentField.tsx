import { IField, IPropsFieldContext } from '@codelab/shared/abstract/core'
import { Input, Select } from 'antd'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useGetAllComponents } from '../../hooks'

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
export const SelectComponentField = ({
  field,
  form,
  context,
}: SelectComponentFieldProps) => {
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
}
