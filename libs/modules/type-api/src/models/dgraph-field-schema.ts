import { BaseDgraphFields, baseFieldsZodShape } from '@codelab/backend'
import { z } from 'zod'
import { dgraphDecoratorSchema } from './decorators'
import { FieldDgraphFields } from './dgraph-field.model'
import { DgraphInterface } from './dgraph-interface.model'
import { dgraphTypeUnionSchema } from './types/allDgraphTypes' // do not shorten

// In a separate file because of circular issues
export const dgraphFieldSchema = z.lazy(() =>
  z.object({
    ...baseFieldsZodShape('Field'),
    [FieldDgraphFields.Name]: z.string(),
    [FieldDgraphFields.Description]: z.string().optional().nullable(),
    [FieldDgraphFields.Key]: z.string(),
    [FieldDgraphFields.Type]: dgraphTypeUnionSchema,
    [FieldDgraphFields.Interface]: DgraphInterface.Schema.or(
      z.object({ [BaseDgraphFields.uid]: z.string() }),
    ),
    [FieldDgraphFields.Decorators]: z
      .array(dgraphDecoratorSchema)
      .nullable()
      .optional(),
  }),
)
