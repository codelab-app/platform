import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IPropDTO } from '../prop'
import type { IInterfaceTypeDTO, IInterfaceTypeRef } from '../type'
import type { IAuth0Owner, IOwnerSchema } from '../user'
import type { ComponentFragment } from './component.fragment.graphql.gen'

export interface IComponentDTO extends IOwnerSchema {
  id: string
  name: string
  rootElement: IEntity
  api: IInterfaceTypeDTO
  props?: IPropDTO | null
  childrenContainerElement: IEntity
}

export interface ICreateComponentData extends IOwnerSchema {
  id: string
  name: string
  childrenContainerElement: IEntity

  // Allow for connection to existing interface
  api?: IInterfaceTypeRef | undefined

  // Allow for connection to existing element
  rootElement?: IEntity
}

export type IUpdateComponentData = Pick<
  ICreateComponentData,
  'id' | 'name' | 'childrenContainerElement'
>

export type IComponentExport = OGM_TYPES.Component

export type IComponentID = string
