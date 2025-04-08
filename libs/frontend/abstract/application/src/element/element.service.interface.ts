import type {
  IElementModel,
  IMoveElementContext,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import type { IPopover } from '@codelab/frontend/abstract/types'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'

import type { IBuilderRoute } from '../builder'
import type { IRuntimeModel } from '../renderer'

export interface IElementService {
  createPopover: IPopover<IBuilderRoute, IBuilderRoute>
  deletePopover: IPopover<IBuilderRoute<{ elementId: string }>, IBuilderRoute>
  /**
   * @param selectedNode Added so we can expand the runtimeElement
   */
  create(
    data: IElementDto,
    selectedNode: Maybe<IRuntimeModel>,
  ): Promise<IElementModel>
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
