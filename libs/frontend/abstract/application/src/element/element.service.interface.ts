import type {
  IElementModel,
  IMoveElementContext,
  IUpdateElementData,
} from '@codelab/frontend-abstract-domain'
import type { IPopover } from '@codelab/frontend-abstract-types'
import type { ICreateElementData } from '@codelab/shared-abstract-core'

import type { IBuilderRoute } from '../builder'
import type { ICrudService } from '../services'

export interface IElementService
  extends ICrudService<IElementModel, ICreateElementData, IUpdateElementData> {
  // Moved from element model to decouple renderer
  createPopover: IPopover<IBuilderRoute, IBuilderRoute>
  deletePopover: IPopover<IBuilderRoute<{ elementId: string }>, IBuilderRoute>
  // loadComponentTree(component: ComponentDevelopmentFragment): {
  //   hydratedElements: Array<IElementModel>
  //   rootElement: IElementModel
  // }
  loadDependantTypes(element: IElementModel): void
  move(context: IMoveElementContext): Promise<void>
  remove(subRoot: IElementModel): Promise<number>
  syncModifiedElements(): Promise<void>
  /**
   * Since used in auto-save form, we must not revalidate cache anywhere in the call tree, otherwise form may re-render
   */
  update(data: IUpdateElementData): Promise<IElementModel>
}
