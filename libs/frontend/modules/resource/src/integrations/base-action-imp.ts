import { Nullish } from '@codelab/shared/abstract/types'
import { flow, makeObservable, observable } from 'mobx'
import { _await } from 'mobx-keystone'
import { BaseResourceImp } from './base-resource-imp'

export abstract class BaseActionImp<
  Resource extends BaseResourceImp<any, any>,
  Config,
  DATA = any,
> {
  // add $ to identify this when converting to antd Tree
  $data: Nullish<DATA>

  $error: any

  isLoading: boolean

  constructor(
    protected _resource: Resource,
    protected _config: Config,
    protected runOnInit: boolean,
    // a function string to transform response after loading
    protected responseTransformer: Nullish<string>,
  ) {
    this.$data = null
    this.$error = null
    this.isLoading = false

    makeObservable(this, {
      $data: observable,
      $error: observable,
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
      this.$data = yield* _await(this.fetch())

      if (this.responseTransformer) {
        // eslint-disable-next-line no-eval
        const transformFn = eval(`(${this.responseTransformer})`)
        this.$data = transformFn(this.$data)
      }
    } catch (error: any) {
      this.$error = error.message
    } finally {
      this.isLoading = false
    }
  }
}
