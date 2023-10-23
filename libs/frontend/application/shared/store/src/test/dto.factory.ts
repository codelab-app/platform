// import type { IRootStoreDtoTest } from '@codelab/frontend/abstract/application'
import type { IRootStoreDtoTest } from '@codelab/frontend/abstract/application'
import {
  IRootStore,
  IRootStoreDto,
} from '@codelab/frontend/abstract/application'
import type {
  IDtoFactory,
  IDtoFactoryCallback,
  IDtoFactoryType,
} from '@codelab/frontend/abstract/domain'
import type { _DeepPartialObject } from 'utility-types/dist/mapped-types'
import { createTestRootStore } from './root.domain.test.store'

/**
 * Create the structure, but don't take in any concrete classes to prevent circular dependency
 */
export class DtoFactory {
  public rootStore: IRootStoreDtoTest['store']

  /**
   * @param factories Inject so each lib can provide the concrete instances
   * @param rootStore Inject the store so the factory can hydrate the models into cache
   *
   */
  constructor(
    private factories: IDtoFactoryCallback,
    rootStoreDto: IRootStoreDtoTest,
  ) {
    this.rootStore = createTestRootStore(rootStoreDto)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  build<T extends keyof IDtoFactory>(factoryType: T, params?: any) {
    const factories = this.factories(this.rootStore)
    const factory = factories[factoryType]

    return factory.build(params) as unknown as IDtoFactory[T]
  }
}
