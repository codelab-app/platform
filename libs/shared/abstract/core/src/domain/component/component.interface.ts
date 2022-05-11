import { IComponentDTO } from './component.dto.interface'

export interface IComponent {
  id: string
  name: string
  rootElementId: string
  ownerId: string

  updateCache(componentFragment: IComponentDTO): void
}

export type IComponentRef = string
