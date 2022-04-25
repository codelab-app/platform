import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Frozen, Ref } from 'mobx-keystone'
import { IElement } from '../element'
import { BuilderDragData } from './builder.interface'
import { BuilderTab } from './builder-tab.interface'
import { IRenderService } from './render.service.interface'

export interface IBuilderService {
  builderTab: BuilderTab
  _selectedElement: Nullable<Ref<IElement>>
  selectedElement: Maybe<IElement>
  hoveredElement: Nullable<Ref<IElement>>
  set_selectedElement(element: Nullable<Ref<IElement>>): void
  builderRenderer: IRenderService
  setHoveredElement(element: Nullable<Ref<IElement>>): void
  currentDragData: Nullable<Frozen<BuilderDragData>>
  setCurrentDragData(data: Nullable<Frozen<BuilderDragData>>): void
  setBuilderTab(data: BuilderTab): void
}
