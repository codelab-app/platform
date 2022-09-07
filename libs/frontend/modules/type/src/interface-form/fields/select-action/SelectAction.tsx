import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { IActionService } from '@codelab/shared/abstract/core'
import React, { useEffect } from 'react'
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
  const [getActions, { isLoading, error }] = useStatefulExecutor(() =>
    actionService.getAll(storeId),
  )

  useEffect(() => {
    getActions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const actionOptions =
    actionService?.actionsList.map((action) => ({
      label: action.name,
      value: action.id,
    })) ?? []

  return (
    <SelectField
      error={error}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={actionOptions}
      showSearch
    />
  )
}
