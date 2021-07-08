import {
  BaseDgraphFields,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { DgraphInterface } from './dgraph-interface.model'
import { DgraphTypeUnion } from './types/allDgraphTypes'

/**
 * Dgraph field names for the Field entity
 */
export enum DgraphFieldFields {
  Name = 'Field.name',
  Description = 'Field.description',
  Key = 'Field.key',
  Type = 'Field.type',
  Interface = 'Field.interface',
}

/**
 * The Field entity, as its represented in Dgraph
 */
export class DgraphField extends DgraphModel<'Field'> {
  [DgraphFieldFields.Name]: string;

  [DgraphFieldFields.Description]?: string | null;

  [DgraphFieldFields.Key]: string;

  [DgraphFieldFields.Type]: DgraphTypeUnion;

  [DgraphFieldFields.Interface]:
    | DgraphInterface
    | { [BaseDgraphFields.uid]: string }

  static Fields = DgraphFieldFields

  static Metadata = new DgraphModelMetadata('Field', DgraphFieldFields)
}
