import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphUnitType, UnitTypeDgraphFields } from './dgraph-unit-type.model'
import { UnitType, unitTypeSchema } from './unit-type.model'

@Injectable()
export class UnitTypeMapper implements IDgraphMapper<DgraphUnitType, UnitType> {
  map(input: DeepPartial<DgraphUnitType>) {
    const dgraphUnitType = DgraphUnitType.Schema.parse(input)
    const unitType = new UnitType()

    unitType.id = dgraphUnitType[BaseDgraphFields.uid]
    unitType.allowedUnits =
      dgraphUnitType[UnitTypeDgraphFields.AllowedUnits] || []

    unitTypeSchema.parse(unitType)

    return unitType
  }
}
