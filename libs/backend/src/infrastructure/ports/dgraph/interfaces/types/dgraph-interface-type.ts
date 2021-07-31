import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphField } from '../dgraph-field'
import { DgraphType } from './dgraph-type'

export interface DgraphInterfaceType
  extends DgraphType<DgraphEntityType.InterfaceType> {
  fields: Array<DgraphField>
}
