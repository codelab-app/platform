import type {
  IRuntimePageModel,
  IRuntimePageService,
} from '@codelab/frontend-abstract-application'
import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { ObjectMap } from 'mobx-keystone'

import {
  getRuntimeElementService,
  runtimeElementRef,
  runtimePageRef,
  runtimeStoreRef,
} from '@codelab/frontend-abstract-application'
import { pageRef, storeRef } from '@codelab/frontend-abstract-domain'
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

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @modelAction
  add(page: IPageModel, childPage?: IPageModel): IRuntimePageModel {
    const compositeKey = RuntimePageModel.compositeKey(page, childPage)
    const foundPage = this.pages.get(compositeKey)

    if (foundPage) {
      return foundPage
    }

    const providerPage = page.providerPage
      ? this.add(page.providerPage, page)
      : undefined

    const runtimeRootElement = this.runtimeElementService.add(
      page.rootElement.current,
      compositeKey,
      undefined,
    )

    const runtimePage = RuntimePageModel.create({
      compositeKey,
      page: pageRef(page.id),
      runtimeRootElement: runtimeElementRef(runtimeRootElement),
      runtimeStore: RuntimeStoreModel.create({
        id: v4(),
        runtimeProviderStore: providerPage?.runtimeStore
          ? runtimeStoreRef(providerPage.runtimeStore.id)
          : undefined,
        store: storeRef(page.store.id),
      }),
    })

    this.pages.set(runtimePage.compositeKey, runtimePage)

    providerPage?.setChildPage(runtimePageRef(runtimePage))

    return providerPage ?? runtimePage
  }

  maybeRuntimePage(compositeKey: string) {
    return this.pages.get(compositeKey)
  }

  @modelAction
  remove(runtimePage: IRuntimePageModel) {
    return this.pages.delete(runtimePage.compositeKey)
  }

  runtimePage(compositeKey: string) {
    const runtimePage = this.pages.get(compositeKey)

    if (!runtimePage) {
      throw new Error('Missing runtime page')
    }

    return runtimePage
  }
}
