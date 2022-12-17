import type { IElementRef } from '../element'
import type { IPropData } from './prop.model.interface'

export interface IExtraElementProps {
  setForElement(element: IElementRef, props: IPropData): void
}
