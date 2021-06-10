import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { DgraphDecorator, dgraphDecoratorSchema } from './decorators'
import { DgraphType, dgraphTypeSchema } from './types'

export enum FieldDgraphFields {
  Name = 'Field.name',
  Description = 'Field.description',
  Key = 'Field.key',
  Type = 'Field.type',
  Decorators = 'Field.decorators',
}

export class DgraphField extends DgraphModel<'Field'> {
  [FieldDgraphFields.Name]: string;

  [FieldDgraphFields.Description]?: string | null;

  [FieldDgraphFields.Key]: string;

  [FieldDgraphFields.Type]: DgraphType;

  [FieldDgraphFields.Decorators]?: Array<DgraphDecorator> | null

  static Fields = FieldDgraphFields

  static Metadata = new DgraphModelMetadata('Field', FieldDgraphFields)

  static Schema = z.object({
    ...baseFieldsZodShape('Field'),
    [FieldDgraphFields.Name]: z.string(),
    [FieldDgraphFields.Description]: z.string().optional().nullable(),
    [FieldDgraphFields.Key]: z.string(),
    [FieldDgraphFields.Type]: dgraphTypeSchema,
    [FieldDgraphFields.Decorators]: z
      .array(dgraphDecoratorSchema)
      .nullable()
      .optional(),
  })
}
