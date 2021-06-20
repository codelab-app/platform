import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { DgraphField } from '@codelab/modules/type-api'
import { z } from 'zod'
import { DgraphPropValue, dgraphPropValueSchema } from '../values'

export enum DgraphPropFields {
  field = 'Prop.field',
  value = 'Prop.value',
}

export class DgraphProp extends DgraphModel<'Prop'> {
  [DgraphPropFields.field]: DgraphField;

  [DgraphPropFields.value]?: DgraphPropValue | null

  static Metadata = new DgraphModelMetadata('Prop', DgraphPropFields)

  static Schema = z.object({
    ...baseFieldsZodShape('Prop'),
    [DgraphPropFields.field]: DgraphField.Schema,
    [DgraphPropFields.value]: dgraphPropValueSchema.optional().nullable(),
  })
}
