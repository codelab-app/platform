import type { IRuntimePageService } from '@codelab/frontend/abstract/application'
import {
  IRuntimePageModel,
  runtimePageRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import {
  IPageModel,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import type { ObjectMap } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RuntimePageModel, RuntimeStoreModel } from '../model'

/**
 * We will have a single RuntimePageService that contains all runtime pages
 *
 */
@model('@codelab/RuntimePageService')
export class RuntimePageService
  extends Model({
    pages: prop<ObjectMap<IRuntimePageModel>>(() => objectMap([])),
  })
  implements IRuntimePageService
{
  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  @modelAction
  add(page: IPageModel): IRuntimePageModel {
    const compositeKey = page.providerPage
      ? RuntimePageModel.compositeKeyForProvider(page, page.providerPage)
      : RuntimePageModel.compositeKey(page)

    const foundPage = this.pages.get(compositeKey)

    if (foundPage) {
      return foundPage
    }

    const runtimePage = RuntimePageModel.create(page)

    if (runtimePage.childPage) {
      this.pages.set(
        runtimePage.childPage.current.compositeKey,
        runtimePage.childPage.current,
      )
    }

    this.pages.set(runtimePage.compositeKey, runtimePage)

    return runtimePage
  }

  @modelAction
  delete(runtimePage: IRuntimePageModel) {
    return this.pages.delete(runtimePage.compositeKey)
  }

  maybeRuntimePage(compositeKey: string) {
    return this.pages.get(compositeKey)
  }

  runtimePage(compositeKey: string) {
    const runtimePage = this.pages.get(compositeKey)

    if (!runtimePage) {
      throw new Error('Missing runtime page')
    }

    return runtimePage
  }
}
