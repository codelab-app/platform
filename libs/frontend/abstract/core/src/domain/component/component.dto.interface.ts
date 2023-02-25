import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IInterfaceTypeRef } from '../type'
import type { IAuth0Owner } from '../user'
import type { ComponentFragment } from './component.fragment.graphql.gen'

export interface ICreateComponentDTO {
  id: string
  name: string
  owner: IAuth0Owner
  childrenContainerElementId: string

  // Allow for connection to existing interface
  api?: IInterfaceTypeRef | undefined

  // Allow for connection to existing element
  rootElement?: IEntity
}

export type IUpdateComponentDTO = Pick<
  ICreateComponentDTO,
  'id' | 'name' | 'childrenContainerElementId'
>

export type IComponentDTO = ComponentFragment

export type IComponentExport = OGM_TYPES.Component

export type IComponentID = string
