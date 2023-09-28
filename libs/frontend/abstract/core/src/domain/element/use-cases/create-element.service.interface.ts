import type { ICreateElementData } from '../element.dto.interface'
import type { IElementModel } from '../element.model.interface'

export interface ICreateElementService {
  createElementAsFirstChild(data: ICreateElementData): Promise<IElementModel>
  createElementAsNextSibling(data: ICreateElementData): Promise<IElementModel>
}
