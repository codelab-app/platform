import type {
  IRuntimePageDTO,
  IRuntimePageModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRuntimeElementService,
  IElementTreeViewDataNode,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import { type IPageModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'

/**
 * Create both provider page and regular page recursively
 *
 * on the first call create the provider page and pass
 *
 */

const compositeKey = (page: IPageModel) => `runtime.${page.id}`

const compositeKeyForProvider = (page: IPageModel, provider: IPageModel) =>
  `runtime.${page.id}.${provider.id}`

const create = (dto: IRuntimePageDTO): IRuntimePageModel =>
  new RuntimePageModel(dto)

@model('@codelab/RuntimePage')
export class RuntimePageModel
  extends Model({
    childPage: prop<Maybe<Ref<IRuntimePageModel>>>(),
    compositeKey: idProp,
    page: prop<Ref<IPageModel>>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimePageModel
{
  static compositeKey = compositeKey

  static compositeKeyForProvider = compositeKeyForProvider

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

    return this.runtimeElementService.add(rootElement, this, null)
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    return this.runtimeRootElement.treeViewNode
  }
}
