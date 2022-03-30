import { Element } from '@codelab/frontend/modules/element'
import { Nullable } from '@codelab/shared/abstract/types'
import { Frozen, frozen, Model, model, prop, Ref } from 'mobx-keystone'
import { BuilderDragData } from '../dnd/BuilderDragData'
import { RenderService } from '../renderer'
import { ExtraElementProps } from '../renderer/ExtraElementProps'
import { BuilderTab } from './BuilderTab'

const voidClick = () => {
  //
}

export type WithBuilderService = {
  builderService: BuilderService
}

@model('@codelab/BuilderService')
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
          global: frozen({ onClick: voidClick }),
        }),
      }),
  ),
}) {}
