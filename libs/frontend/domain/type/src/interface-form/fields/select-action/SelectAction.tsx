import { IActionService } from '@codelab/frontend/abstract/core'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'

export interface SelectActionProps {
  name: string
  storeId: string
  actionService: IActionService
}

export const SelectAction = ({
  name,
  actionService,
  storeId,
}: SelectActionProps) => {
  const { loading, error } = useAsync(() => actionService.getAll(storeId))

  const actionOptions = actionService.actionsList.map((action) => ({
    label: action.name,
    value: action.id,
  }))

  return (
    <SelectField
      error={error}
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={actionOptions}
      showSearch
    />
  )
}
