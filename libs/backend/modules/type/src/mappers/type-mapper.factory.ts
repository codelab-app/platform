import { DgraphEntityType, DgraphType } from '@codelab/backend/infra'
import { TypeKind } from '@codelab/shared/graph'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { typeDefinitionByDgraphType } from '../shared'
import { ArrayTypeMapper } from './array-type.mapper'
import { ComponentTypeMapper } from './component-type.mapper'
import { ElementTypeMapper } from './element-type.mapper'
import { EnumTypeMapper } from './enum-type.mapper'
import { InterfaceTypeMapper } from './interface-type.mapper'
import { LambdaTypeMapper } from './lambda-type.mapper'
import { PrimitiveTypeMapper } from './primitive-type.mapper'

@Injectable()
export class TypeMapperFactory {
  private mappers: Map<TypeKind, Mapper<DgraphType<any>, any>>

  constructor(
    primitiveTypeMapper: PrimitiveTypeMapper,
    arrayTypeMapper: ArrayTypeMapper,
    enumTypeMapper: EnumTypeMapper,
    interfaceMapper: InterfaceTypeMapper,
    lambdaTypeMapper: LambdaTypeMapper,
    elementTypeMapper: ElementTypeMapper,
    componentTypeMapper: ComponentTypeMapper,
  ) {
    this.mappers = new Map<TypeKind, Mapper<DgraphType<any>, any>>()

    this.mappers.set(TypeKind.PrimitiveType, primitiveTypeMapper)
    this.mappers.set(TypeKind.ArrayType, arrayTypeMapper)
    this.mappers.set(TypeKind.EnumType, enumTypeMapper)
    this.mappers.set(TypeKind.InterfaceType, interfaceMapper)
    this.mappers.set(TypeKind.LambdaType, lambdaTypeMapper)
    this.mappers.set(TypeKind.ElementType, elementTypeMapper)
    this.mappers.set(TypeKind.ComponentType, componentTypeMapper)
  }

  getMapper(type: DgraphType<DgraphEntityType>): Mapper<DgraphType<any>, any> {
    const def = typeDefinitionByDgraphType(type)

    return this.getMapperByKind(def.typeKind)
  }

  getMapperByKind(kind: TypeKind): Mapper<DgraphType<any>, any> {
    const mapper = this.mappers.get(kind)

    if (!mapper) {
      throw new Error(
        `Can't map dgraph type, unrecognized kind ${kind}. Add it to TypeMapperFactory`,
      )
    }

    return mapper
  }
}
