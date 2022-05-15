import { IField } from '@codelab/shared/abstract/core'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { SelectField } from 'uniforms-antd'
import { useGetAllComponents } from '../../hooks'

export interface SelectComponentFieldProps {
  field: IField
  form: UseFormReturn
}

export const SelectComponentField = ({
  field,
  form,
}: SelectComponentFieldProps) => {
  const { options, isLoading } = useGetAllComponents()

  return (
    <>
      <Controller
        control={form.control}
        defaultValue={field.type.current.id}
        name={`${field.key}.type`}
        // eslint-disable-next-line react/jsx-no-useless-fragment
        render={(control) => <></>}
      />
      <Controller
        control={form.control}
        name={`${field.key}.value`}
        render={(control) => (
          <SelectField
            loading={isLoading}
            name={control.field.name}
            onBlur={control.field.onBlur}
            onChange={control.field.onBlur}
            optionFilterProp="label"
            options={options}
            showSearch
            value={control.field.value}
          />
        )}
      />
    </>
  )
}
