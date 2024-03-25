import type {
  IRuntimePageDTO,
  IRuntimePageModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRuntimeElementService,
  IRuntimeElementModel,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import {
  IElementTreeViewDataNode,
  type IPageModel,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'
import { v4 } from 'uuid'
import { RuntimeStoreModel } from './runtime-store.model'

/**
 * Create both provider page and regular page recursively
 *
 * on the first call create the provider page and pass
 *
 */

const compositeKey = (page: IPageModel) => `runtime.${page.id}`

const compositeKeyForProvider = (page: IPageModel, provider: IPageModel) =>
  `runtime.${page.id}.${provider.id}`

const create = ({ page }: IRuntimePageDTO): IRuntimePageModel => {
  const runtimeStore = RuntimeStoreModel.create({
    id: v4(),
    store: storeRef(
      page.providerPage ? page.providerPage.store.id : page.store.id,
    ),
  })

  const childPage = page.providerPage
    ? new RuntimePageModel({
        compositeKey: compositeKey(page),
        page: pageRef(page.id),
        runtimeStore: RuntimeStoreModel.create({
          id: v4(),
          runtimeProviderStore: runtimeStoreRef(runtimeStore.id),
          store: storeRef(page.store.id),
        }),
      })
    : undefined

  return new RuntimePageModel({
    childPage,
    compositeKey: page.providerPage
      ? compositeKeyForProvider(page, page.providerPage)
      : compositeKey(page),
    page: pageRef(page.providerPage ? page.providerPage : page),
    runtimeStore,
  })
}

@model('@codelab/RuntimePage')
export class RuntimePageModel
  extends Model({
    childPage: prop<Maybe<IRuntimePageModel>>(),
    compositeKey: idProp,
    page: prop<Ref<IPageModel>>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimePageModel
{
  static create = create

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @computed
  get runtimeRootElement(): IRuntimeElementModel {
    const rootElement = this.page.current.rootElement.current

    return this.runtimeElementService.add(rootElement, this)
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    return {
      ...this.runtimeRootElement.treeViewNode,
      key: this.runtimeRootElement.element.current.id,
      primaryTitle: this.runtimeRootElement.element.current.name,
    }
  }
}
