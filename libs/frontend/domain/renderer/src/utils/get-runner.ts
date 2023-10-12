import type {
  IActionRunner,
  IRenderer,
} from '@codelab/frontend/abstract/domain'
import { getRunnerId } from '@codelab/frontend/abstract/domain'
import isNil from 'lodash/isNil'

export const getRunner = (
  renderer?: IRenderer,
  actionId?: string,
  storeId?: string,
  providerStoreId?: string,
): { runner?: IActionRunner; fromProvider?: boolean } => {
  if (!renderer || !actionId || !storeId) {
    return {}
  }

  const runner = renderer.actionRunners.get(getRunnerId(storeId, actionId))

  if (!isNil(runner)) {
    return { fromProvider: false, runner }
  }

  if (!providerStoreId) {
    return {}
  }

  const providerRunner = renderer.actionRunners.get(
    getRunnerId(providerStoreId, actionId),
  )

  return {
    fromProvider: !isNil(providerRunner),
    runner: providerRunner,
  }
}
