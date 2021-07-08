import { BaseDgraphFields, baseFieldsZodShape } from '@codelab/backend'
import { z } from 'zod'
import { DgraphFieldFields } from './dgraph-field.model'
import { DgraphInterface } from './dgraph-interface.model'
import { dgraphTypeUnionSchema } from './types/allDgraphTypes' // do not shorten

// In a separate file because of circular issues
export const dgraphFieldSchema = z.lazy(() =>
  z.object({
    ...baseFieldsZodShape('Field'),
    [DgraphFieldFields.Name]: z.string(),
    [DgraphFieldFields.Description]: z.string().optional().nullable(),
    [DgraphFieldFields.Key]: z.string(),
    [DgraphFieldFields.Type]: z.union([
      dgraphTypeUnionSchema,
      z.object({ [BaseDgraphFields.uid]: z.string() }),
    ]),
    [DgraphFieldFields.Interface]: DgraphInterface.Schema.or(
      z.object({ [BaseDgraphFields.uid]: z.string() }),
    ),
  }),
)
