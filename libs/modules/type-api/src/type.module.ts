import { CytoscapeModule, TreeModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { FieldResolver } from './field.resolver'
import { FieldValidator } from './field.validator'
import {
  ArrayTypeMapper,
  EnumTypeMapper,
  EnumTypeValueMapper,
  FieldMapper,
  InterfaceTypeMapper,
  PrimitiveTypeMapper,
  TypeMapperFactory,
} from './mappers'
import { TypeResolver } from './type.resolver'
import { TypeValidator } from './type.validator'
import { TypeTreeTransformer } from './type-tree.transformer'
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
  TypeTreeTransformer,
]

@Module({
  imports: [CytoscapeModule, TreeModule],
  providers: [FieldResolver, TypeResolver, ...services],
  exports: [...services],
})
export class TypeModule {}
