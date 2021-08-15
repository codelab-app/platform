import { CytoscapeModule, TreeModule, Void } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import {
  ComponentTypeAdapter,
  ElementTypeAdapter,
  EnumTypeAdapter,
  EnumTypeValueAdapter,
  FieldAdapter,
  InterfaceTypeAdapter,
  LambdaTypeAdapter,
  PrimitiveTypeAdapter,
  TypeAdapterFactory,
  TypeGraphAdapter,
} from './adapters'
import { ArrayTypeAdapter } from './adapters/array-type.adapter'
import { FieldResolver } from './field.resolver'
import { FieldValidator } from './field.validator'
import { TypeResolver } from './type.resolver'
import { TypeValidator } from './type.validator'
import {
  CreateFieldService,
  CreateTypeService,
  DeleteFieldService,
  DeleteTypeService,
  GetFieldService,
  GetTypeService,
  GetTypesService,
  UpdateEnumTypeService,
  UpdateFieldService,
  UpdatePrimitiveTypeService,
  UpdateTypeService,
} from './use-cases'

const adapters = [
  InterfaceTypeAdapter,
  ArrayTypeAdapter,
  FieldAdapter,
  ComponentTypeAdapter,
  TypeAdapterFactory,
  PrimitiveTypeAdapter,
  EnumTypeAdapter,
  EnumTypeValueAdapter,
  LambdaTypeAdapter,
  ElementTypeAdapter,
]

const services = [
  ...adapters,
  //
  // Fields
  CreateFieldService,
  DeleteFieldService,
  GetFieldService,
  UpdateFieldService,
  FieldValidator,
  //
  // Types
  CreateTypeService,
  DeleteTypeService,
  GetTypeService,
  GetTypesService,
  UpdateEnumTypeService,
  UpdatePrimitiveTypeService,
  UpdateTypeService,
  TypeValidator,
  TypeGraphAdapter,
]

@Module({
  imports: [CytoscapeModule, TreeModule],
  providers: [FieldResolver, TypeResolver, Void, ...services],
  exports: [...services],
})
export class TypeModule {}
