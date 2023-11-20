import type {
  IActionDomainService,
  IActionModel,
} from '@codelab/frontend/abstract/domain'
import {
  getBuilderDomainService,
  isElementRef,
} from '@codelab/frontend/abstract/domain'
import type { ActionFragment } from '@codelab/shared/abstract/codegen'
import type { IActionDTO, IRef } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import uniq from 'lodash/uniq'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { ActionFactory, ApiAction, CodeAction } from './store'

@model('@codelab/ActionDomainService')
export class ActionDomainService
  extends Model({
    actionFactory: prop(() => new ActionFactory({})),
    actions: prop(() => objectMap<IActionModel>()),
  })
  implements IActionDomainService
{
  @computed
  get actionsList() {
    return [...this.actions.values()]
  }

  @computed
  get builderService() {
    return getBuilderDomainService(this)
  }

  @modelAction
  load(actions: Array<ActionFragment>) {
    return actions.map((action) =>
      this.hydrate(this.actionFactory.fromActionFragment(action)),
    )
  }

  @modelAction
  hydrate<T extends IActionDTO>(actionDTO: T) {
    let action: IActionModel

    switch (actionDTO.__typename) {
      case IActionKind.CodeAction:
        action = CodeAction.create(actionDTO)
        break
      case IActionKind.ApiAction:
        action = ApiAction.create(actionDTO)
        break
      default:
        throw new Error(`Unsupported action kind: ${actionDTO.__typename}`)
    }

    this.actions.set(action.id, action)

    return action
  }

  action(id: string) {
    return this.actions.get(id)
  }

  getSelectActionOptions(actionEntity?: IRef) {
    const { selectedNode } = this.builderService
    const selectedNodeStore = selectedNode?.current.store.current

    const providerStore =
      selectedNode && isElementRef(selectedNode)
        ? selectedNode.current.providerStore
        : undefined

    const updatedAction = actionEntity
      ? this.action(actionEntity.id)
      : undefined

    const parentActions = this.getParentActions(updatedAction)

    const filtered = this.actionsList.filter((action) => {
      const belongsToStore =
        action.store.id === selectedNodeStore?.id ||
        action.store.id === providerStore?.id

      // when selecting success,error actions for an apiAction
      // it should not appear in selection
      const actionBeingUpdated = action.id === updatedAction?.id
      // calling parent actions will cause infinite loop
      const parentAction = parentActions.includes(action.id)

      return belongsToStore && !actionBeingUpdated && !parentAction
    })

    return filtered.map((action) => ({
      label: action.name,
      value: action.id,
    }))
  }

  private getParentActions(action?: IActionModel): Array<string> {
    if (!action) {
      return []
    }

    const parents = this.actionsList.filter(
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
          uniq(parents.flatMap((parent) => this.getParentActions(parent))),
        )
    )
  }
}
