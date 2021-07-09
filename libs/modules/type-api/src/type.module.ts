import { Module } from '@nestjs/common'
import { FieldResolver } from './field.resolver'
import { InterfaceResolver } from './interface.resolver'
import {
  ArrayTypeMapper,
  EnumTypeMapper,
  EnumTypeValueMapper,
  FieldMapper,
  InterfaceMapper,
  PrimitiveTypeMapper,
  TypeMapper,
} from './models'
import { TypeResolver } from './type.resolver'
import {
  CreateFieldService,
  CreateInterfaceService,
  CreateTypeService,
  CreateTypeValidator,
  DeleteFieldService,
  DeleteTypeService,
  FieldMutationValidator,
  GetDgraphFieldService,
  GetDgraphTypeService,
  GetFieldService,
  GetInterfaceService,
  GetInterfacesService,
  GetInterfaceWithAtomService,
  GetTypeService,
  GetTypesService,
  UpdateEnumTypeService,
  UpdateFieldService,
  UpdateInterfaceService,
  UpdatePrimitiveTypeService,
  UpdateTypeService,
} from './use-cases'
import { GetFieldsByTypeService } from './use-cases/type/get-fields-by-type'

const mappers = [
  InterfaceMapper,
  FieldMapper,
  TypeMapper,
  PrimitiveTypeMapper,
  EnumTypeMapper,
  EnumTypeValueMapper,
  ArrayTypeMapper,
]

const services = [
  ...mappers,
  //
  // Interfaces
  CreateInterfaceService,
  GetInterfaceService,
  GetInterfaceWithAtomService,
  GetInterfacesService,
  GetDgraphTypeService,
  UpdateInterfaceService,
  //
  // Fields
  CreateFieldService,
  DeleteFieldService,
  GetFieldService,
  GetDgraphFieldService,
  UpdateFieldService,
  FieldMutationValidator,
  //
  // Types
  CreateTypeService,
  DeleteTypeService,
  GetDgraphTypeService,
  GetTypeService,
  GetTypesService,
  UpdateEnumTypeService,
  UpdateTypeService,
  UpdatePrimitiveTypeService,
  CreateTypeValidator,
  GetFieldsByTypeService,
]

@Module({
  controllers: [],
  providers: [InterfaceResolver, FieldResolver, TypeResolver, ...services],
  exports: [...services],
})
export class TypeModule {}
