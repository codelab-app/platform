import type { StoreWhere } from '@codelab/shared/abstract/codegen'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectStoreProps = UniformSelectFieldProps & {
  where: StoreWhere
}

export const SelectStore = ({ error, name, where }: SelectStoreProps) => {
  const {
    error: queryError,
    loading,
    value,
  } = useAsync(() => interfaceFormApi.InterfaceForm_GetStores({ where }), [])

  const options =
    value?.stores.map((store) => ({ label: store.name, value: store.id })) ?? []

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={options}
      showSearch={true}
    />
  )
}
