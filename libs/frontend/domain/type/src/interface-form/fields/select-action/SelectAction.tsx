import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useQuery } from 'react-query'
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

  const { data, isLoading, error } = useQuery(
    'interface-form/select-action',
    () => interfaceFormApi.InterfaceForm_GetActions({ appId }),
  )

  const actionOptions = [
    ...(data?.apiActions || []),
    ...(data?.codeActions || []),
  ].map((action) => ({
    label: action.name,
    value: action.id,
  }))

  return {
    data,
    actionOptions,
    isLoading,
    error,
  }
}

export const SelectAction = ({ name, label, error }: SelectActionProps) => {
  const { actionOptions, isLoading, error: queryError } = useGetAllActions()

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={actionOptions}
      showSearch
    />
  )
}
