import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphInterface } from '../dgraph-interface.model'
import { ArrayTypeMapper, DgraphArrayType } from './array-type'
import { DgraphType } from './dgraph-type.model'
import { DgraphEnumType, EnumTypeMapper } from './enum-type'
import { InterfaceTypeMapper } from './interface-type'
import { DgraphSimpleType, SimpleTypeMapper } from './simple-type'
import { Type } from './type.model'
import { DgraphUnitType, UnitTypeMapper } from './unit-type'

@Injectable()
export class TypeMapper implements IDgraphMapper<DgraphType, Type> {
  constructor(
    private simpleTypeMapper: SimpleTypeMapper,
    private arrayTypeMapper: ArrayTypeMapper,
    private enumTypeMapper: EnumTypeMapper,
    private unitTypeMapper: UnitTypeMapper,
    private interfaceTypeMapper: InterfaceTypeMapper,
  ) {}

  map(input: DeepPartial<DgraphType>) {
    const dgraphTypeArray = input[BaseDgraphFields.DgraphType]

    if (!dgraphTypeArray || !dgraphTypeArray[0]) {
      throw new Error("Can't map dgraph type without the field dgraph.type")
    }

    const dgraphType = dgraphTypeArray[0]

    switch (dgraphType) {
      case 'ArrayType':
        return this.arrayTypeMapper.map(input as DgraphArrayType)
      case 'UnitType':
        return this.unitTypeMapper.map(input as DgraphUnitType)
      case 'EnumType':
        return this.enumTypeMapper.map(input as DgraphEnumType)
      case 'Interface':
        return this.interfaceTypeMapper.map(input as DgraphInterface)
      case 'SimpleType':
        return this.simpleTypeMapper.map(input as DgraphSimpleType)
      default:
        throw new Error(
          "Can't map dgraph type, unrecognized type " + dgraphType,
        )
    }
  }
}
