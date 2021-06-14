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
  InterfaceTypeMapper,
  MinMaxValidatorMapper,
  RequiredValidatorMapper,
  SimpleTypeMapper,
  TypeMapper,
  UnitTypeMapper,
} from './models'
import { TypeResolver } from './type.resolver'
import {
  CreateFieldService,
  CreateInterfaceService,
  DeleteInterfaceService,
  FieldMutationValidator,
  GetFieldService,
  GetInterfaceService,
  GetInterfacesService,
  GetRecursiveInterfaceService,
  GetTypeService,
  UpdateFieldService,
  UpdateInterfaceService,
} from './use-cases'
import { DeleteFieldService } from './use-cases/field/delete-field'

const mappers = [
  InterfaceMapper,
  FieldMapper,
  TypeMapper,
  UnitTypeMapper,
  SimpleTypeMapper,
  InterfaceTypeMapper,
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
  CreateInterfaceService,
  GetInterfacesService,
  GetRecursiveInterfaceService,
  GetInterfaceService,
  UpdateInterfaceService,
  DeleteInterfaceService,
  CreateFieldService,
  GetFieldService,
  UpdateFieldService,
  FieldMutationValidator,
  GetTypeService,
  DeleteFieldService,
]

@Module({
  controllers: [],
  providers: [InterfaceResolver, FieldResolver, TypeResolver, ...services],
  exports: [...services],
})
export class TypeModule {}
