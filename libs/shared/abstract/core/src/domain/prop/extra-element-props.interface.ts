import { IElementRef } from '../element'
import { IPropData } from './prop.interface'

export interface IExtraElementProps {
  setForElement(element: IElementRef, props: IPropData): void
}
