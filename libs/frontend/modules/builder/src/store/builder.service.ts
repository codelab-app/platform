import {
  BuilderDragData,
  BuilderTab,
  IBuilderService,
  IElement,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { Frozen, frozen, Model, model, prop, Ref } from 'mobx-keystone'
import { RenderService, renderServiceContext } from '../renderer'
import { ExtraElementProps } from '../renderer/ExtraElementProps'
import { StateModalService } from './state-modal.service'

const voidClick = () => {
  //
}

const globalProps = { onClick: voidClick }

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    _selectedElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    hoveredElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),

    builderTab: prop<BuilderTab>(BuilderTab.Tree).withSetter(),
    stateModal: prop(() => new StateModalService({})),

    // Use a builder-specific render service that overwrites
    // each onClick handler with a void click handler.
    builderRenderer: prop(
      () =>
        new RenderService({
          extraElementProps: new ExtraElementProps({
            global: frozen(globalProps),
          }),
        }),
    ),
  })
  implements IBuilderService
{
  /**
   * Element could be a placeholder for detached elements, so can't be current
   */
  @computed
  get selectedElement() {
    return this._selectedElement?.maybeCurrent
  }

  protected override onAttachedToRootStore(
    rootStore: object,
  ): (() => void) | void {
    renderServiceContext.set(this, this.builderRenderer)

    // Override it in case the renderer comes from a snapshot
    this.builderRenderer.extraElementProps.setGlobal(frozen(globalProps))
  }
}
