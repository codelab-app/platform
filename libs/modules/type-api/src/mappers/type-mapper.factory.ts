import {
  DgraphEntity,
  DgraphEntityType,
  DgraphEnumType,
  DgraphPrimitiveType,
  DgraphType,
  instanceOfDgraphModel,
  Mapper,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { ArrayTypeMapper, ArrayTypeMapperInput } from './array-type.mapper'
import { EnumTypeMapper } from './enum-type.mapper'
import {
  InterfaceTypeMapper,
  InterfaceTypeMapperInput,
} from './interface-type.mapper'
import { LambdaTypeMapper } from './lambda-type.mapper'
import { PrimitiveTypeMapper } from './primitive-type.mapper'

export type TypeMapperInput =
  | ArrayTypeMapperInput
  | DgraphEnumType
  | InterfaceTypeMapperInput
  | DgraphPrimitiveType

@Injectable()
export class TypeMapperFactory {
  constructor(
    private primitiveTypeMapper: PrimitiveTypeMapper,
    private arrayTypeMapper: ArrayTypeMapper,
    private enumTypeMapper: EnumTypeMapper,
    private interfaceMapper: InterfaceTypeMapper,
    private lambdaTypeMapper: LambdaTypeMapper,
  ) {}

  getMapper(type: TypeMapperInput): Mapper<DgraphType<any>, any> {
    if (
      instanceOfDgraphModel(
        type as DgraphEntity<any>,
        DgraphEntityType.ArrayType,
      )
    ) {
      return this.arrayTypeMapper
    }

    if (
      instanceOfDgraphModel(
        type as DgraphEntity<any>,
        DgraphEntityType.EnumType,
      )
    ) {
      return this.enumTypeMapper
    }

    if (
      instanceOfDgraphModel(
        type as DgraphEntity<any>,
        DgraphEntityType.InterfaceType,
      )
    ) {
      return this.interfaceMapper
    }

    if (
      instanceOfDgraphModel(
        type as DgraphEntity<any>,
        DgraphEntityType.PrimitiveType,
      )
    ) {
      return this.primitiveTypeMapper
    }

    if (
      instanceOfDgraphModel(
        type as DgraphEntity<any>,
        DgraphEntityType.LambdaType,
      )
    ) {
      return this.lambdaTypeMapper
    }

    throw new Error(
      "Can't map dgraph type, unrecognized type " + type['dgraph.type'],
    )
  }
}
