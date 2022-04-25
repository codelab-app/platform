import { ICreateElementDTO } from '../element'

export interface MoveData {
  order: number
  parentElementId: string
}

export interface BuilderDragData {
  type: BuilderDndType.CreateElement
  createElementInput: ICreateElementDTO
}

export enum BuilderDndType {
  CreateElement = 'CreateElement',
}
