import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { DgraphField, dgraphFieldSchema } from '@codelab/modules/type-api'
import { z } from 'zod'
import { DgraphPropValue, dgraphPropValueSchema } from '../values'

export enum DgraphPropFields {
  field = 'Prop.field',
  value = 'Prop.value',
  pageElement = 'Prop.pageElement',
}

export class DgraphProp extends DgraphModel<'Prop'> {
  [DgraphPropFields.field]: DgraphField;

  [DgraphPropFields.value]?: DgraphPropValue | { uid: string } | null

  static Metadata = new DgraphModelMetadata('Prop', DgraphPropFields)

  static Schema = z.object({
    ...baseFieldsZodShape('Prop'),
    [DgraphPropFields.field]: dgraphFieldSchema,
    [DgraphPropFields.value]: z
      .lazy(() => dgraphPropValueSchema)
      .optional()
      .nullable(),
  })
}
