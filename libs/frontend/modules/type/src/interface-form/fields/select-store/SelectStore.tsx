import { StoreWhere } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectStoreProps = HTMLFieldProps<string, SelectFieldProps> & {
  where: StoreWhere
}

export const SelectStore = ({ name, error, where }: SelectStoreProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-store', () =>
    interfaceFormApi.InterfaceForm_GetStores({ where }),
  )

  const options =
    data?.stores.map((store) => ({ label: store.name, value: store.id })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={options}
      showSearch={true}
    />
  )
}
