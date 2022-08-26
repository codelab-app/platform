import { Nullish } from '@codelab/shared/abstract/types'
import { IElement } from './element.model.interface'

export interface IElementLinkService {
  linkElement(props: {
    element: IElement
    prevSiblingId: Nullish<string>
    nextSiblingId: Nullish<string>
    parentElementId: Nullish<string>
    shouldUpdateCache?: boolean
  }): Promise<void>
  unlinkElement(element: IElement, shouldUpdateCache?: boolean): Promise<void>
  moveAsRoot(elementId: string, targetId: string): Promise<void>
  moveElementNextTo(elementId: string, targetId: string): Promise<void>
}
