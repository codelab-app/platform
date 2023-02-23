import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
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
  rootElementId?: string | undefined
}

export type IUpdateComponentDTO = Pick<
  ICreateComponentDTO,
  'name' | 'childrenContainerElementId'
>

export type IComponentDTO = ComponentFragment

export type IComponentExport = OGM_TYPES.Component
