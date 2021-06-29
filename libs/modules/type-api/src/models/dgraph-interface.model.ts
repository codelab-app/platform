import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
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
  Atom = 'Interface.atom',
}

export class DgraphInterface extends DgraphType<'Interface'> {
  [InterfaceDgraphFields.Fields]?: Array<DgraphField> | null;

  [InterfaceDgraphFields.Atom]?: DgraphModel | null

  static Metadata = baseDgraphTypeMetadata.extend(
    new DgraphModelMetadata('Interface', InterfaceDgraphFields),
  )

  static Schema: z.ZodSchema<DgraphInterface> = z.lazy(() =>
    baseDgraphTypeSchema('Interface').extend({
      [InterfaceDgraphFields.Atom]: z
        .object({
          ...baseFieldsZodShape('Atom'),
        })
        .optional()
        .nullable(),
      [InterfaceDgraphFields.Fields]: dgraphFieldSchema
        .array()
        .optional()
        .nullable(),
    }),
  ) as z.ZodSchema<DgraphInterface>
}
