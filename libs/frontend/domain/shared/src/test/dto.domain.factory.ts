// import type { IRootStoreDtoTest } from '@codelab/frontend/abstract/application'

import { IRootStoreDto } from '@codelab/frontend/abstract/application'
import type {
  DomainMap,
  IFactoryDomain,
  IFactoryDomainCallback,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import type { BuildOptions, DeepPartial } from 'fishery'
import type { _DeepPartialObject } from 'utility-types/dist/mapped-types'

/**
 * Create the structure, but don't take in any concrete classes to prevent circular dependency
 */
export class DtoDomainFactory {
  /**
   * @param factories Inject so each lib can provide the concrete instances
   * @param rootStore Inject the store so the factory can hydrate the models into cache
   *
   * Fishery has concept of the transient param, which is a different type from the factory return type.
   *
   * This is what we need since we transform dto -> model type.
   */
  constructor(
    private factories: IFactoryDomainCallback,
    private rootStore: Partial<IRootDomainStore>,
  ) {}

  build<
    K extends keyof IFactoryDomain,
    T extends DomainMap[K][0],
    I extends DomainMap[K][1],
  >(factoryType: K, transient?: BuildOptions<T, I>['transient']) {
    const factories = this.factories(this.rootStore)
    const factory = factories[factoryType]

    return factory?.build(undefined, {
      transient,
    })
  }
}
