import { InterfaceEntity } from './interface.entity'

export interface FieldProperties {
  name: string
  interface: InterfaceEntity
}

export class FieldEntity implements FieldProperties {
  declare name: string

  declare interface: InterfaceEntity
}
