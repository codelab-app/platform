import { DgraphAtom, DgraphDomain } from '@codelab/backend'
import {
  InterfaceTypeProperties,
  TypeValueProperties,
} from '@codelab/modules/type-api'
import { AtomTypeEnum } from '../infrastructure'

export interface AtomProperties {
  name: string
  propTypes?: Record<string, unknown>
  api: TypeValueProperties<InterfaceTypeProperties>
  atomType: `${AtomTypeEnum}`
}

export class AtomEntity implements AtomProperties, DgraphDomain<DgraphAtom> {
  atomType: `${AtomTypeEnum}`

  api: TypeValueProperties<InterfaceTypeProperties>

  name: string

  propTypes?: Record<string, unknown>

  private constructor({ atomType, api, name, propTypes }: AtomProperties) {
    this.name = name
    this.api = api
    this.atomType = atomType
    this.propTypes = propTypes
  }

  static create(props: AtomProperties) {
    return new AtomEntity(props)
  }
}
