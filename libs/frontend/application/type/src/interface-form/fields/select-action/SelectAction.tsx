/* eslint-disable react/jsx-props-no-spreading */
import type { IActionModel } from '@codelab/frontend/abstract/domain'
import { isElementPageNodeRef } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { IActionKind } from '@codelab/shared/abstract/core'
import type {
  IEntity,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import uniq from 'lodash/uniq'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name' | 'required' | 'value'
> & {
  onChange(value: unknown): void
  updatedAction?: IEntity
}

const getParentActions = (
  actions: Array<IActionModel>,
  action: IActionModel,
): Array<string> => {
  const parents = actions.filter(
    (parent) =>
      parent.type === IActionKind.ApiAction &&
      (parent.successAction?.id === action.id ||
        parent.errorAction?.id === action.id),
  )

  return (
    parents
      .map((parent) => parent.id)
      // get parents of parents
      .concat(
        uniq(parents.flatMap((parent) => getParentActions(actions, parent))),
      )
  )
}

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { actionService, builderService } = useStore()
  const selectedNode = builderService.selectedNode

  const updatedAction = fieldProps.updatedAction
    ? actionService.action(fieldProps.updatedAction.id)
    : null

  const store = selectedNode?.current.store.current

  const providerStore = isElementPageNodeRef(selectedNode)
    ? selectedNode.current.providerStore?.current
    : undefined

  const parentActions = updatedAction
    ? getParentActions(actionService.actionsList, updatedAction)
    : []

  const actions = actionService.actionsList.filter((action) => {
    const belongsToStore =
      action.store.id === store?.id || action.store.id === providerStore?.id

    // when selecting success,error actions for an apiAction
    // it should not appear in selection
    const actionBeingUpdated = action.id === updatedAction?.id
    // calling parent actions will cause infinite loop
    const parentAction = parentActions.includes(action.id)

    return belongsToStore && !actionBeingUpdated && !parentAction
  })

  const options = actions.map((action) => ({
    label: action.name,
    value: action.id,
  }))

  return (
    <SelectField
      {...fieldProps}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      optionFilterProp="label"
      options={options}
      showSearch
    />
  )
}
