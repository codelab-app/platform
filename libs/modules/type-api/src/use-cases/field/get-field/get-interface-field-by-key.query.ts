import {
  BaseDgraphFields,
  DgraphQueryBuilder,
  DgraphQueryField,
  EqFilter,
  IDgraphQueryFilter,
} from '@codelab/backend'
import {
  DgraphField,
  DgraphInterface,
  InterfaceDgraphFields,
} from '../../../models'
import { GetFieldQueryBuilder, GetFieldQueryResult } from './get-field.query'

export class GetInterfaceFieldByKeyQueryBuilder extends DgraphQueryBuilder {
  constructor(key: string, otherFieldFilters: Array<IDgraphQueryFilter> = []) {
    super()

    const fieldQueryBuilder = new GetFieldQueryBuilder()

    this.withBaseFields().withFields(
      DgraphInterface.Fields.Name,
      new DgraphQueryField(DgraphInterface.Fields.Fields)
        .withInnerFields(...fieldQueryBuilder.fields)
        .withFilters(
          new EqFilter(DgraphField.Fields.Key, key),
          ...otherFieldFilters,
        ),
    )
  }
}

export type GetInterfaceFieldByKeyResult = Pick<
  DgraphInterface,
  | InterfaceDgraphFields.Name
  | BaseDgraphFields.DgraphType
  | BaseDgraphFields.uid
> & {
  [InterfaceDgraphFields.Fields]?: Array<GetFieldQueryResult>
}
