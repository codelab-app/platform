import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphEntityType, DgraphType } from '@codelab/backend/infra'
import { TypeKind } from '@codelab/shared/graph'
import { Injectable } from '@nestjs/common'
import { typeDefinitionByDgraphType } from '../../domain/type-definition-by-dgraph-type'
import { ArrayTypeAdapter } from './array-type.adapter'
import { ComponentTypeAdapter } from './component-type.adapter'
import { ElementTypeAdapter } from './element-type.adapter'
import { EnumTypeAdapter } from './enum-type.adapter'
import { InterfaceTypeAdapter } from './interface-type.adapter'
import { LambdaTypeAdapter } from './lambda-type.adapter'
import { PrimitiveTypeAdapter } from './primitive-type.adapter'

type Adapter = BaseAdapter<DgraphType<any>, any>

@Injectable()
export class TypeAdapterFactory {
  private mappers: Map<TypeKind, Adapter>

  constructor(
    private primitiveTypeAdapter: PrimitiveTypeAdapter,
    private arrayTypeAdapter: ArrayTypeAdapter,
    private enumTypeAdapter: EnumTypeAdapter,
    private interfaceAdapter: InterfaceTypeAdapter,
    private lambdaTypeAdapter: LambdaTypeAdapter,
    private elementTypeAdapter: ElementTypeAdapter,
    private componentTypeAdapter: ComponentTypeAdapter,
  ) {
    this.mappers = new Map<TypeKind, Adapter>()

    this.mappers.set(TypeKind.PrimitiveType, primitiveTypeAdapter)
    this.mappers.set(TypeKind.ArrayType, arrayTypeAdapter)
    this.mappers.set(TypeKind.EnumType, enumTypeAdapter)
    this.mappers.set(TypeKind.InterfaceType, interfaceAdapter)
    this.mappers.set(TypeKind.LambdaType, lambdaTypeAdapter)
    this.mappers.set(TypeKind.ElementType, elementTypeAdapter)
    this.mappers.set(TypeKind.ComponentType, componentTypeAdapter)
  }

  getMapper(type: DgraphType<DgraphEntityType>): Adapter {
    const def = typeDefinitionByDgraphType(type)

    return this.getMapperByKind(def.typeKind)
  }

  getMapperByKind(kind: TypeKind): Adapter {
    const mapper = this.mappers.get(kind)

    if (!mapper) {
      throw new Error(
        `Can't map dgraph type, unrecognized kind ${kind}. Add it to TypeMapperFactory`,
      )
    }

    return mapper
  }
}
