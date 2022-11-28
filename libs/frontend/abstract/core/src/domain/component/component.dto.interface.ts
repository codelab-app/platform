import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { IInterfaceTypeRef } from '../type'
import { IAuth0Id } from '../user'
import { ComponentFragment } from './component.fragment.graphql.gen'

export interface ICreateComponentDTO {
  id: string
  name: string
  auth0Id: IAuth0Id

  // Allow for connection to existing interface
  api?: IInterfaceTypeRef | undefined

  // Allow for connection to existing element
  rootElementId?: string | undefined
}

export type IUpdateComponentDTO = Pick<ICreateComponentDTO, 'name'>

export type IComponentDTO = ComponentFragment

export type IComponentExport = OGM_TYPES.Component
