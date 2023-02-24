import type {
  IComputeElementNameService,
  RenderType,
} from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import {
  getBuilderService,
  getComponentService,
} from '@codelab/frontend/presenter/container'
import type { Maybe } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import isNil from 'lodash/isNil'
import { computed } from 'mobx'
import { _async, _await, Model, model, modelFlow, prop } from 'mobx-keystone'
import { makeAutoIncrementedName } from '../utils'

/**
 * A base class to extend with, any model that could contain element trees
 */
@model('@codelab/ComputeElementNameService')
export class ComputeElementNameService
  extends Model({
    pickedRenderTypeName: prop<Maybe<string>>(),
    pickedName: prop<Maybe<string>>().withSetter(),
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
  private get builderService() {
    return getBuilderService(this)
  }

  @computed
  get hasCustomName() {
    return (
      !isNil(this.pickedName) && this.pickedRenderTypeName !== this.pickedName
    )
  }

  @modelFlow
  setPickedRenderType = _async(function* (
    this: ComputeElementNameService,
    renderType: RenderType,
  ) {
    let name: Maybe<string>

    if (renderType.model === RenderTypeEnum.Atom) {
      name = (yield* _await(this.atomService.getOne(renderType.id)))?.name
    }

    if (renderType.model === RenderTypeEnum.Component) {
      name = (yield* _await(this.componentService.getOne(renderType.id)))?.name
    }

    name = name
      ? makeAutoIncrementedName(
          this.builderService.activeElementTree?.elementsList.map(
            (element) => element.name,
          ) || [],
          compoundCaseToTitleCase(name),
        )
      : undefined

    // If the previous name is unchanged, this updates
    // the name based on the selected atom or component
    if (this.pickedRenderTypeName === this.pickedName && name) {
      this.pickedName = name
    }

    this.pickedRenderTypeName = name
  })
}
