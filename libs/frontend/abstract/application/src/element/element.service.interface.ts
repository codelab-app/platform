import type {
  IElementModel,
  IMoveElementContext,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import type {
  BuilderContextParams,
  ComponentContextParams,
  IPopover,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type { IElementDto } from '@codelab/shared/abstract/core'

import type { IBuilderContext } from '../builder'

export interface IElementService {
  // Moved from element model to decouple renderer
  createPopover: IPopover<IBuilderContext>
  deletePopover: IPopover<IBuilderContext<{ elementId: string }>>
  create(data: IElementDto): Promise<IElementModel>
  // loadComponentTree(component: ComponentDevelopmentFragment): {
  //   hydratedElements: Array<IElementModel>
  //   rootElement: IElementModel
  // }
  loadDependantTypes(element: IElementModel): void
  move(context: IMoveElementContext): Promise<void>
  remove(subRoot: IElementModel): Promise<void>
  syncModifiedElements(): Promise<void>
  update(data: IUpdateElementData): Promise<IElementModel>
}
