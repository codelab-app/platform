import { IField } from '@codelab/shared/abstract/core'
import { Select } from 'antd'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
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
          <Select
            loading={isLoading}
            onBlur={control.field.onBlur}
            onChange={control.field.onChange}
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
