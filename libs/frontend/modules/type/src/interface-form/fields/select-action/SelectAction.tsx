import { ACTION_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import React, { useEffect } from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = WithServices<ACTION_SERVICE> & {
  name: string
  storeId: string
}

export const SelectAction = ({
  name,
  actionService,
  storeId,
}: SelectActionProps) => {
  const [getActions, { isLoading, error }] = useStatefulExecutor(() =>
    actionService.getAll({ store: { id: storeId } }),
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
