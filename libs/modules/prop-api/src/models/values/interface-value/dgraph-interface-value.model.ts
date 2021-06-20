import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { DgraphProp } from '../../prop'

export enum DgraphInterfaceValueFields {
  props = 'InterfaceValue.props',
}

export class DgraphInterfaceValue extends DgraphModel<'InterfaceValue'> {
  [DgraphInterfaceValueFields.props]: Array<DgraphProp>

  static Metadata = new DgraphModelMetadata(
    'InterfaceValue',
    DgraphInterfaceValueFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('InterfaceValue'),
    [DgraphInterfaceValueFields.props]: DgraphProp.Schema.array(),
  })
}
