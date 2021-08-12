import {
  DgraphEntityType,
  DgraphType,
  isDgraphArrayType,
  isDgraphComponentType,
  isDgraphElementType,
  isDgraphEnumType,
  isDgraphInterfaceType,
  isDgraphLambdaType,
  isDgraphPrimitiveType,
} from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { ArrayTypeMapper } from './array-type.mapper'
import { ComponentTypeMapper } from './component-type.mapper'
import { ElementTypeMapper } from './element-type.mapper'
import { EnumTypeMapper } from './enum-type.mapper'
import { InterfaceTypeMapper } from './interface-type.mapper'
import { LambdaTypeMapper } from './lambda-type.mapper'
import { PrimitiveTypeMapper } from './primitive-type.mapper'

@Injectable()
export class TypeMapperFactory {
  constructor(
    private primitiveTypeMapper: PrimitiveTypeMapper,
    private arrayTypeMapper: ArrayTypeMapper,
    private enumTypeMapper: EnumTypeMapper,
    private interfaceMapper: InterfaceTypeMapper,
    private lambdaTypeMapper: LambdaTypeMapper,
    private elementTypeMapper: ElementTypeMapper,
    private componentTypeMapper: ComponentTypeMapper,
  ) {}

  getMapper(
    type: DgraphType<DgraphEntityType.Type>,
  ): Mapper<DgraphType<any>, any> {
    if (isDgraphArrayType(type)) {
      return this.arrayTypeMapper
    }

    if (isDgraphEnumType(type)) {
      return this.enumTypeMapper
    }

    if (isDgraphInterfaceType(type)) {
      return this.interfaceMapper
    }

    if (isDgraphPrimitiveType(type)) {
      return this.primitiveTypeMapper
    }

    if (isDgraphLambdaType(type)) {
      return this.lambdaTypeMapper
    }

    if (isDgraphElementType(type)) {
      return this.elementTypeMapper
    }

    if (isDgraphComponentType(type)) {
      return this.componentTypeMapper
    }

    throw new Error(
      "Can't map dgraph type, unrecognized type " + type['dgraph.type'],
    )
  }
}
