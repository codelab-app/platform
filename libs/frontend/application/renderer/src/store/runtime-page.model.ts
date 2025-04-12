import type {
  IElementTreeViewDataNode,
  IElementTreeViewDataNodePreview,
  IRuntimeElementModel,
  IRuntimePageDto,
  IRuntimePageModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'

import {
  getRuntimeElementService,
  getRuntimePageService,
} from '@codelab/frontend/abstract/application'
import { type IPageModel } from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

/**
 * Create both provider page and regular page recursively
 *
 * on the first call create the provider page and pass
 */

const compositeKey = (page: IPageModel) => `runtime.${page.id}`

const compositeKeyForProvider = (page: IPageModel, provider: IPageModel) =>
  `runtime.${page.id}.${provider.id}`

const create = (dto: IRuntimePageDto): IRuntimePageModel =>
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
  get elements(): Array<IRuntimeElementModel> {
    return this.runtimeElementService.elementsList.filter(
      (element) =>
        element.closestContainerNode.current.compositeKey === this.compositeKey,
    )
  }

  @computed
  get mainTreeElement(): Maybe<IRuntimeElementModel> {
    return this.childPage?.current.runtimeRootElement
  }

  @computed
  get render(): Nullable<ReactElement<unknown>> {
    return this.runtimeRootElement.render
  }

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @computed
  get runtimePageService() {
    return getRuntimePageService(this)
  }

  @computed
  get runtimeRootElement(): IRuntimeElementModel {
    const rootElement = this.page.current.rootElement.current

    return this.runtimeElementService.add(rootElement, this, null)
  }

  @computed
  get toJson(): IRuntimePageDto {
    return {
      childPage: this.childPage ?? undefined,
      compositeKey: this.compositeKey,
      page: this.page,
      runtimeStore: this.runtimeStore,
    }
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    return this.runtimeRootElement.treeViewNode
  }

  @computed
  get treeViewNodePreview(): IElementTreeViewDataNodePreview {
    return this.runtimeRootElement.treeViewNodePreview
  }

  @modelAction
  detach(): void {
    this.runtimeRootElement.detach()
    this.runtimePageService.remove(this)
  }
}
