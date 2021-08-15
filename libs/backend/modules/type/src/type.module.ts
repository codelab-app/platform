import { CytoscapeModule, TreeModule, Void } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { FieldResolver } from './field.resolver'
import { FieldValidator } from './field.validator'
import {
  ArrayTypeAdapter,
  ElementTypeAdapter,
  EnumTypeAdapter,
  EnumTypeValueAdapter,
  FieldAdapter,
  InterfaceTypeAdapter,
  LambdaTypeAdapter,
  PrimitiveTypeAdapter,
  TypeAdapterFactory,
} from './mappers'
import { TypeResolver } from './type.resolver'
import { TypeValidator } from './type.validator'
import { TypeTreeAdapter } from './type-tree.adapter'
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
  InterfaceTypeAdapter,
  FieldAdapter,
  TypeAdapterFactory,
  PrimitiveTypeAdapter,
  EnumTypeAdapter,
  EnumTypeValueAdapter,
  ArrayTypeAdapter,
  LambdaTypeAdapter,
  ElementTypeAdapter,
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
  TypeTreeAdapter,
]

@Module({
  imports: [CytoscapeModule, TreeModule],
  providers: [FieldResolver, TypeResolver, Void, ...services],
  exports: [...services],
})
export class TypeModule {}
