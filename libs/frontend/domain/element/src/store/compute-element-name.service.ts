import type {
  IComputeElementNameService,
  RenderType,
} from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getComponentService } from '@codelab/frontend/presenter/container'
import type { Maybe } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
} from 'mobx-keystone'

/**
 * A base class to extend with, any model that could contain element trees
 */
@model('@codelab/ComputeElementNameService')
export class ComputeElementNameService
  extends Model({
    pickedRenderTypeName: prop<Maybe<string>>(),
    pickedName: prop<string>(() => ''),
  })
  implements IComputeElementNameService
{
  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  get computedName() {
    if (this.pickedRenderTypeName) {
      return compoundCaseToTitleCase(this.pickedRenderTypeName)
    }

    return this.pickedName
  }

  @modelFlow
  setPickedRenderType = _async(function* (
    this: ComputeElementNameService,
    renderType: RenderType,
  ) {
    // Don't change the name picked by the user
    if (this.pickedName) {
      return
    }

    if (renderType.model === RenderTypeEnum.Atom) {
      this.pickedRenderTypeName = (yield* _await(
        this.atomService.getOne(renderType.id),
      ))?.name
    }

    if (renderType.model === RenderTypeEnum.Component) {
      this.pickedRenderTypeName = (yield* _await(
        this.componentService.getOne(renderType.id),
      ))?.name
    }
  })

  @modelAction
  setPickedName(name: string) {
    this.pickedName = name
    this.pickedRenderTypeName = undefined
  }
}
