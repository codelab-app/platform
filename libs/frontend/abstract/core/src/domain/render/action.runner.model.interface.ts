import type { Ref } from 'mobx-keystone'
import type { IAction } from '../action'
import type { IPropData } from '../prop'
import type { IStore } from '../store'

export interface ActionRunnerThisObject {
  rootState?: IPropData
  state: IPropData
  urlProps?: IPropData
}

export interface IActionRunner {
  actionRef: Ref<IAction>
  id: string
  props: IPropData

  runner(...args: Array<unknown>): void
}

export const getRunnerId = (storeId: string, actionId: string) =>
  `${storeId}${actionId}`

export const getActionRunnerThisObject = (
  runner: IActionRunner,
  store: Ref<IStore>,
  providerStore?: Ref<IStore>,
  urlProps?: IPropData,
) => {
  const _this: ActionRunnerThisObject = {
    state: store.current.state,
    urlProps: urlProps ?? {},
  }

  // If the action used in a regular page is from the provider, the `state` to use
  // in the action should be the `state` from the provider store
  if (providerStore) {
    const isActionFromProvider =
      runner.actionRef.current.store.id === providerStore.id

    _this[isActionFromProvider ? 'state' : 'rootState'] =
      providerStore.current.state
  }

  return _this
}
