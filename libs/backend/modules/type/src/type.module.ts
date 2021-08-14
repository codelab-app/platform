import { CytoscapeModule, TreeModule, Void } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { FieldResolver } from './field.resolver'
import { FieldValidator } from './field.validator'
import {
  ArrayTypeMapper,
  ComponentTypeMapper,
  ElementTypeMapper,
  EnumTypeMapper,
  EnumTypeValueMapper,
  FieldMapper,
  InterfaceTypeMapper,
  LambdaTypeMapper,
  PrimitiveTypeMapper,
  TypeGraphMapper,
  TypeMapperFactory,
} from './mappers'
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

const mappers = [
  InterfaceTypeMapper,
  FieldMapper,
  TypeMapperFactory,
  PrimitiveTypeMapper,
  EnumTypeMapper,
  EnumTypeValueMapper,
  ArrayTypeMapper,
  LambdaTypeMapper,
  ElementTypeMapper,
  ComponentTypeMapper,
  TypeGraphMapper,
]

const services = [
  ...mappers,
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
]

@Module({
  imports: [CytoscapeModule, TreeModule],
  providers: [FieldResolver, TypeResolver, Void, ...services],
  exports: [...services],
})
export class TypeModule {}
