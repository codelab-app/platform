import { Element } from '@codelab/frontend/modules/element'
import { Nullable } from '@codelab/shared/abstract/types'
import { Frozen, frozen, Model, model, prop, Ref } from 'mobx-keystone'
import { BuilderDragData } from '../dnd/BuilderDragData'
import { RenderService, renderServiceContext } from '../renderer'
import { ExtraElementProps } from '../renderer/ExtraElementProps'
import { BuilderTab } from './BuilderTab'

const voidClick = () => {
  //
}

export type WithBuilderService = {
  builderService: BuilderService
}

const globalProps = { onClick: voidClick }

@model('codelab/BuilderService')
export class BuilderService extends Model({
  selectedElement: prop<Nullable<Ref<Element>>>(() => null).withSetter(),
  hoveredElement: prop<Nullable<Ref<Element>>>(() => null).withSetter(),
  currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(
    () => null,
  ).withSetter(),

  builderTab: prop<BuilderTab>(() => BuilderTab.Tree).withSetter(),

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
}) {
  protected override onAttachedToRootStore(
    rootStore: object,
  ): (() => void) | void {
    renderServiceContext.set(this, this.builderRenderer)

    // Override it in case the renderer comes from a snapshot
    this.builderRenderer.extraElementProps.setGlobal(frozen(globalProps))
  }
}
