import type {
  IRendererModel,
  IRuntimeAction,
} from '@codelab/frontend/abstract/application'
import { getRunnerId } from '@codelab/frontend/abstract/application'
import isNil from 'lodash/isNil'

export const getRunner = (
  renderer?: IRendererModel,
  actionId?: string,
  storeId?: string,
  providerStoreId?: string,
): { runner?: IRuntimeAction; fromProvider?: boolean } => {
  if (!renderer || !actionId || !storeId) {
    return {}
  }

  const runner = renderer.runtimeStores.get(getRunnerId(storeId, actionId))

  if (!isNil(runner)) {
    return { fromProvider: false, runner }
  }

  if (!providerStoreId) {
    return {}
  }

  const providerRunner = renderer.runtimeStores.get(
    getRunnerId(providerStoreId, actionId),
  )

  return {
    fromProvider: !isNil(providerRunner),
    runner: providerRunner,
  }
}
