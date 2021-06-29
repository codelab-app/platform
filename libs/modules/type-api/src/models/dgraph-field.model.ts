import {
  BaseDgraphFields,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { DgraphDecorator } from './decorators'
import { DgraphInterface } from './dgraph-interface.model'
import { DgraphTypeUnion } from './types/allDgraphTypes'

export enum FieldDgraphFields {
  Name = 'Field.name',
  Description = 'Field.description',
  Key = 'Field.key',
  Type = 'Field.type',
  Interface = 'Field.interface',
  Decorators = 'Field.decorators',
}

export class DgraphField extends DgraphModel<'Field'> {
  [FieldDgraphFields.Name]: string;

  [FieldDgraphFields.Description]?: string | null;

  [FieldDgraphFields.Key]: string;

  [FieldDgraphFields.Type]: DgraphTypeUnion;

  [FieldDgraphFields.Decorators]?: Array<DgraphDecorator> | null;

  [FieldDgraphFields.Interface]:
    | DgraphInterface
    | { [BaseDgraphFields.uid]: string }

  static Fields = FieldDgraphFields

  static Metadata = new DgraphModelMetadata('Field', FieldDgraphFields)
}
