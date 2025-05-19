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

const compositeKey = (page: IPageModel, childPage?: IPageModel) =>
  `runtime.${page.id}${childPage ? `.${childPage.id}` : ''}`

const create = (dto: IRuntimePageDto): IRuntimePageModel =>
  new RuntimePageModel(dto)

@model('@codelab/RuntimePage')
export class RuntimePageModel
  extends Model({
    childPage: prop<Maybe<Ref<IRuntimePageModel>>>().withSetter(),
    compositeKey: idProp,
    page: prop<Ref<IPageModel>>(),
    runtimeRootElement: prop<Ref<IRuntimeElementModel>>().withSetter(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimePageModel
{
  static compositeKey = compositeKey

  static create = create

  @computed
  get elements(): Array<IRuntimeElementModel> {
    return this.runtimeElementService.elementsList.filter(
      (element) =>
        element.closestContainerNode.compositeKey === this.compositeKey,
    )
  }

  @computed
  get mainTreeElement(): Maybe<IRuntimeElementModel> {
    return this.childPage?.current.runtimeRootElement.current
  }

  @computed
  get rendered(): Nullable<ReactElement<unknown>> {
    return this.runtimeRootElement.current.rendered ?? null
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
  get toJson(): IRuntimePageDto {
    return {
      compositeKey: this.compositeKey,
      page: this.page,
      runtimeRootElement: this.runtimeRootElement,
      runtimeStore: this.runtimeStore,
    }
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    return this.runtimeRootElement.current.treeViewNode
  }

  @computed
  get treeViewNodePreview(): IElementTreeViewDataNodePreview {
    return this.runtimeRootElement.current.treeViewNodePreview
  }

  @modelAction
  detach(): void {
    this.runtimeRootElement.current.detach()
    this.runtimePageService.remove(this)
  }

  @modelAction
  render(): void {
    this.childPage?.current.render()
    this.runtimeRootElement.current.render()
  }
}
