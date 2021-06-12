import {
  BaseDgraphFields,
  DgraphModel,
  DgraphQueryBuilder,
  DgraphQueryField,
} from '@codelab/backend'
import {
  DecoratorDgraphTypes,
  DgraphField,
  FieldDgraphFields,
} from '../../../models'
import {
  GetTypeQueryBuilder,
  GetTypeQueryResult,
} from '../../type/get-type/get-type.query'

export class GetFieldQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    const typeQueryBuilder = new GetTypeQueryBuilder()

    this.withBaseFields().withFields(
      FieldDgraphFields.Name,
      FieldDgraphFields.Description,
      FieldDgraphFields.Key,
      new DgraphQueryField(FieldDgraphFields.Type).withInnerFields(
        ...typeQueryBuilder.fields,
      ),
      new DgraphQueryField(FieldDgraphFields.Decorators).withBaseInnerFields(),
    )
  }
}

export type GetFieldQueryResult = Pick<
  DgraphField,
  | FieldDgraphFields.Name
  | BaseDgraphFields.uid
  | BaseDgraphFields.DgraphType
  | FieldDgraphFields.Description
  | FieldDgraphFields.Key
> & {
  [FieldDgraphFields.Type]: GetTypeQueryResult
} & {
  [FieldDgraphFields.Decorators]: DgraphModel<DecoratorDgraphTypes>
}
