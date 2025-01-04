import type {
  IElementModel,
  IElementTree,
  IMoveElementContext,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import type {
  ComponentContextParams,
  IPopover,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

/**
 * Used for modal input
 */
export interface CreateElementData {
  elementOptions: Array<{
    childrenIds?: Array<string>
    label: string
    value: string
  }>
  elementTree: IElementTree
  selectedElement?: Maybe<IElementModel>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CreateElementProperties = {
  // elementTree: IElementTree | null
  parentElement?: IElementModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UpdateElementProperties = {
  element?: IElementModel
}

export interface IElementService {
  // Moved from element model to decouple renderer
  createPopover: IPopover<PageContextParams & ComponentContextParams>
  deletePopover: IPopover<
    PageContextParams & ComponentContextParams & { elementId: string }
  >
  create(data: IElementDto): Promise<IElementModel>
  getElement(id: string): IElementModel
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
