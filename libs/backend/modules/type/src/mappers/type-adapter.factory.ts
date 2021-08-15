import { BaseAdapter } from '@codelab/backend/abstract/core'
import {
  DgraphEntityType,
  DgraphType,
  isDgraphArrayType,
  isDgraphElementType,
  isDgraphEnumType,
  isDgraphInterfaceType,
  isDgraphLambdaType,
  isDgraphPrimitiveType,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { ArrayTypeAdapter } from './array-type.adapter'
import { ElementTypeAdapter } from './element-type.adapter'
import { EnumTypeAdapter } from './enum-type.adapter'
import { InterfaceTypeAdapter } from './interface-type.adapter'
import { LambdaTypeAdapter } from './lambda-type.adapter'
import { PrimitiveTypeAdapter } from './primitive-type.adapter'

@Injectable()
export class TypeAdapterFactory {
  constructor(
    private primitiveTypeAdapter: PrimitiveTypeAdapter,
    private arrayTypeAdapter: ArrayTypeAdapter,
    private enumTypeAdapter: EnumTypeAdapter,
    private interfaceAdapter: InterfaceTypeAdapter,
    private lambdaTypeAdapter: LambdaTypeAdapter,
    private elementTypeAdapter: ElementTypeAdapter,
  ) {}

  getMapper(
    type: DgraphType<DgraphEntityType.Type>,
  ): BaseAdapter<DgraphType<any>, any> {
    if (isDgraphArrayType(type)) {
      return this.arrayTypeAdapter
    }

    if (isDgraphEnumType(type)) {
      return this.enumTypeAdapter
    }

    if (isDgraphInterfaceType(type)) {
      return this.interfaceAdapter
    }

    if (isDgraphPrimitiveType(type)) {
      return this.primitiveTypeAdapter
    }

    if (isDgraphLambdaType(type)) {
      return this.lambdaTypeAdapter
    }

    if (isDgraphElementType(type)) {
      return this.elementTypeAdapter
    }

    throw new Error(
      "Can't map dgraph type, unrecognized type " + type['dgraph.type'],
    )
  }
}
