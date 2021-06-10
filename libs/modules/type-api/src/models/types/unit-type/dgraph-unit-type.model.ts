import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { Unit, unitSchema } from './unit.model'

export enum UnitTypeDgraphFields {
  AllowedUnits = 'UnitType.allowedUnits',
}

export class DgraphUnitType extends DgraphModel<'UnitType'> {
  [UnitTypeDgraphFields.AllowedUnits]?: Array<Unit> | null

  static Metadata = new DgraphModelMetadata('UnitType', UnitTypeDgraphFields)

  static Schema = z.object({
    ...baseFieldsZodShape('UnitType'),
    [UnitTypeDgraphFields.AllowedUnits]: z
      .array(unitSchema)
      .optional()
      .nullable(),
  })
}
