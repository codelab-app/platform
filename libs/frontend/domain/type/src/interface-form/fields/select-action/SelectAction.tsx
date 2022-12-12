import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'label' | 'name' | 'error'
>

/**
 * @returns { data, isLoading, error,actionOptions }
 */
const useGetAllActions = () => {
  const appId = useCurrentAppId()

  const { value, loading, error } = useAsync(
    () => interfaceFormApi.InterfaceForm_GetActions({ appId }),
    [],
  )

  const actionOptions = [
    ...(value?.apiActions || []),
    ...(value?.codeActions || []),
  ].map((action) => ({
    label: action.name,
    value: action.id,
  }))

  return { actionOptions, loading, error }
}

export const SelectAction = ({ name, label, error }: SelectActionProps) => {
  const { actionOptions, loading, error: queryError } = useGetAllActions()

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={actionOptions}
      showSearch
    />
  )
}
