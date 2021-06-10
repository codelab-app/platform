import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { DgraphField } from './dgraph-field.model'

export enum InterfaceDgraphFields {
  Name = 'Interface.name',
  Fields = 'Interface.fields',
}

export class DgraphInterface extends DgraphModel<'Interface'> {
  [InterfaceDgraphFields.Name]: string;

  [InterfaceDgraphFields.Fields]?: Array<DgraphField> | null

  static Fields = InterfaceDgraphFields

  static Metadata = new DgraphModelMetadata('Interface', InterfaceDgraphFields)

  static Schema: z.ZodSchema<DgraphInterface> = z.lazy(() =>
    z.object({
      ...baseFieldsZodShape('Interface'),
      [InterfaceDgraphFields.Name]: z.string(),
      [InterfaceDgraphFields.Fields]: z
        .array(DgraphField.Schema)
        .optional()
        .nullable(),
    }),
  )
}
