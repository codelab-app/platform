import { IOperation } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { flow, makeObservable, observable } from 'mobx'
import { _await } from 'mobx-keystone'
import { BaseResource } from './base-resource'

export abstract class BaseOperation<
  Resource extends BaseResource<any>,
  Config extends IOperation['config'],
  DATA = any,
> {
  data: Nullish<DATA>

  error: any

  isLoading: boolean

  constructor(
    protected _resource: Resource,
    protected _config: Config,
    protected runOnInit: boolean,
  ) {
    this.data = null
    this.error = null
    this.isLoading = false

    makeObservable(this, {
      data: observable,
      error: observable,
      isLoading: observable,
      run: flow.bound,
    })

    if (this.runOnInit) {
      this.run()
    }
  }

  abstract fetch(): Promise<DATA>

  *run() {
    this.isLoading = true

    try {
      this.data = yield* _await(this.fetch())
    } catch (error) {
      this.error = error
    } finally {
      this.isLoading = false
    }
  }
}
