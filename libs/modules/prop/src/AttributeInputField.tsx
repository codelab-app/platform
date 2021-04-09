import { Select, SelectProps, Spin } from 'antd'
import React from 'react'
import { connectField, FieldProps } from 'uniforms'
import { useDebouncedState } from '@codelab/frontend/shared'
import { Attribute_Bool_Exp, useGetAttributesQuery } from '@codelab/hasura'

export type AttributeInputFieldProps<T> = FieldProps<
  T,
  {
    selectProps: Omit<
      SelectProps<T>,
      | 'showSearch'
      | 'labelInValue'
      | 'filterOption'
      | 'onSearch'
      | 'notFoundContent'
      | 'options'
      | 'onChange'
      | 'value'
    >
  }
>

export type AttributeInputFieldValue = {
  key: string
  value: string
  label: string
}

//Created this to be able to dynamically select a attribute key, but
//left it for automatically getting the attributes and displaying them as fields
//This might still be useful sometime though, (e.g, in a attributes search bar) so I'm keeping it
const _AttributeInputField = <T extends AttributeInputFieldValue>({
  onChange,
  value,
  selectProps: { style, ...props } = {},
}: AttributeInputFieldProps<T>) => {
  const [searchValue, setSearchValue] = useDebouncedState<string>(200)

  const where: Attribute_Bool_Exp = {}

  if (searchValue) {
    where.key = { _ilike: `%${searchValue}%` }
  }

  const { data: attributes, loading } = useGetAttributesQuery({
    variables: {
      where,
    },
  })

  const options = attributes?.attribute.map((a) => ({
    key: a.id,
    value: a.id,
    label: a.key,
  }))

  const search = (value: string) => {
    setSearchValue(value)
  }

  return (
    <Select<T>
      showSearch
      labelInValue
      placeholder="Attribute"
      filterOption={false}
      onSearch={search}
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={options}
      onChange={onChange}
      value={value}
      style={{ width: '100%', ...style }}
      {...props}
    />
  )
}

export const AttributeInputField = connectField(_AttributeInputField)
