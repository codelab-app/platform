import type { IRuntimePageService } from '@codelab/frontend/abstract/application'
import type { ObjectMap } from 'mobx-keystone'

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
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { v4 } from 'uuid'

import { RuntimePageModel, RuntimeStoreModel } from '../store'

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

    const runtimeStore = RuntimeStoreModel.create({
      id: v4(),
      store: storeRef(
        page.providerPage ? page.providerPage.store.id : page.store.id,
      ),
    })

    const childPage = page.providerPage
      ? RuntimePageModel.create({
          compositeKey: RuntimePageModel.compositeKey(page),
          page: pageRef(page.id),
          runtimeStore: RuntimeStoreModel.create({
            id: v4(),
            runtimeProviderStore: runtimeStoreRef(runtimeStore.id),
            store: storeRef(page.store.id),
          }),
        })
      : undefined

    if (childPage) {
      this.pages.set(childPage.compositeKey, childPage)
    }

    const runtimePage = RuntimePageModel.create({
      childPage: childPage ? runtimePageRef(childPage) : undefined,
      compositeKey: page.providerPage
        ? RuntimePageModel.compositeKeyForProvider(page, page.providerPage)
        : RuntimePageModel.compositeKey(page),
      page: pageRef(page.providerPage ? page.providerPage : page),
      runtimeStore,
    })

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
