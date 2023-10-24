import type { IFactoryDomain } from '@codelab/frontend/abstract/domain'
import type { IRootStore } from './root.application.store.interface'

/**
 * Injects root store, allow us to hydrate data within it
 */
export type IFactoryApplicationCallback = (
  rootStore: Partial<IRootStore>,
) => IFactoryDomain
