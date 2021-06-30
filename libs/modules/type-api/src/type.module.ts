import { Module } from '@nestjs/common'
import { FieldResolver } from './field.resolver'
import { InterfaceResolver } from './interface.resolver'
import {
  ArrayLengthValidatorMapper,
  ArrayTypeMapper,
  DecoratorMapper,
  EnumTypeMapper,
  EnumTypeValueMapper,
  FieldMapper,
  InterfaceMapper,
  MinMaxValidatorMapper,
  RequiredValidatorMapper,
  SimpleTypeMapper,
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
  UpdateSimpleTypeService,
  UpdateTypeService,
} from './use-cases'
import { GetFieldsByTypeService } from './use-cases/type/get-fields-by-type'

const mappers = [
  InterfaceMapper,
  FieldMapper,
  TypeMapper,
  SimpleTypeMapper,
  EnumTypeMapper,
  EnumTypeValueMapper,
  ArrayTypeMapper,
  DecoratorMapper,
  RequiredValidatorMapper,
  MinMaxValidatorMapper,
  ArrayLengthValidatorMapper,
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
  UpdateSimpleTypeService,
  CreateTypeValidator,
  GetFieldsByTypeService,
]

@Module({
  controllers: [],
  providers: [InterfaceResolver, FieldResolver, TypeResolver, ...services],
  exports: [...services],
})
export class TypeModule {}
