import type { StoreWhere } from '@codelab/shared/abstract/codegen'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectStoreProps = UniformSelectFieldProps & {
  where: StoreWhere
}

export const SelectStore = ({ error, name, where }: SelectStoreProps) => {
  const [{ error: queryError, result, status }, getStores] = useAsync(() =>
    interfaceFormApi.InterfaceForm_GetStores({ where }),
  )

  const options =
    result?.stores.map((store) => ({ label: store.name, value: store.id })) ??
    []

  useMountEffect(getStores.execute)

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={status === 'loading'}
      name={name}
      optionFilterProp="label"
      options={options}
      showSearch={true}
    />
  )
}
