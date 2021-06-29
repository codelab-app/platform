import { DgraphModelMetadata } from '@codelab/backend'
import { z } from 'zod'
import { DgraphField } from './dgraph-field.model'
import { dgraphFieldSchema } from './dgraph-field-schema'
import {
  baseDgraphTypeMetadata,
  baseDgraphTypeSchema,
  DgraphType,
} from './types/dgraph-type.model' // do not shorten

export enum InterfaceDgraphFields {
  Fields = 'Interface.fields',
}

export class DgraphInterface extends DgraphType<'Interface'> {
  [InterfaceDgraphFields.Fields]?: Array<DgraphField> | null

  static Metadata = baseDgraphTypeMetadata.extend(
    new DgraphModelMetadata('Interface', InterfaceDgraphFields),
  )

  static Schema: z.ZodSchema<DgraphInterface> = z.lazy(() =>
    baseDgraphTypeSchema('Interface').extend({
      [InterfaceDgraphFields.Fields]: dgraphFieldSchema
        .array()
        .optional()
        .nullable(),
    }),
  ) as z.ZodSchema<DgraphInterface>
}
