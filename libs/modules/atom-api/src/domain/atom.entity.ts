import { AggregateRoot } from '@codelab/ddd/core'
import { AggregateRootProperties, Uuid } from '@codelab/ddd/types'
import { InterfaceEntity } from '@codelab/modules/type-api'
import { AtomType, AtomTypeEnum } from '../infrastructure'

export interface AtomProperties extends AggregateRootProperties {
  name: AtomType
  label: string
  propTypes: InterfaceEntity
}

export class AtomEntity extends AggregateRoot implements AtomProperties {
  declare readonly name: AtomTypeEnum

  declare readonly label: string

  propTypes: any

  constructor(id: Uuid) {
    super(id)
  }
}
