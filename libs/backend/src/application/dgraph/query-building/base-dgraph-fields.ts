import { DgraphQueryBuilder } from './dgraph-query-builder'
import { DgraphQueryField } from './dgraph-query-field'

export enum BaseDgraphFields {
  uid = 'uid',
  DgraphType = 'dgraph.type',
}

export const baseFieldEnums =
  DgraphQueryBuilder.fieldsFromEnum(BaseDgraphFields)

export const BaseFields = {
  Uid: new DgraphQueryField(BaseDgraphFields.uid),
  DgraphType: new DgraphQueryField(BaseDgraphFields.DgraphType),
}

export const baseFields = Object.values(BaseFields)
