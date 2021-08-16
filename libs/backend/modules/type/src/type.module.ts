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
} from './application/adapters'
import { ArrayTypeAdapter } from './application/adapters/array-type.adapter'
import { TypeResolver } from './application/type.resolver'
import { TypeValidator } from './domain/type.validator'
import { CreateTypeService } from './use-cases/type/create-type'
import { DeleteTypeService } from './use-cases/type/delete-type'
import { GetTypeService } from './use-cases/type/get-type'
import { GetTypesService } from './use-cases/type/get-types'
import { UpdateEnumTypeService } from './use-cases/type/update-enum-type'
import { UpdatePrimitiveTypeService } from './use-cases/type/update-primitive-type'
import { UpdateTypeService } from './use-cases/type/update-type'

const services = [
  /**
   * Use Cases
   */
  CreateTypeService,
  DeleteTypeService,
  GetTypeService,
  GetTypesService,
  UpdateEnumTypeService,
  UpdatePrimitiveTypeService,
  UpdateTypeService,
  /**
   * Adapters
   */
  InterfaceTypeAdapter,
  ArrayTypeAdapter,
  ComponentTypeAdapter,
  TypeAdapterFactory,
  PrimitiveTypeAdapter,
  EnumTypeAdapter,
  EnumTypeValueAdapter,
  LambdaTypeAdapter,
  ElementTypeAdapter,
  TypeGraphAdapter,
  FieldAdapter,
  /**
   * Validators
   */
  TypeValidator,
]

// TODO: Rename this lib to `field`, as field depends on type
@Module({
  imports: [CytoscapeModule, TreeModule],
  providers: [TypeResolver, Void, ...services],
  exports: [...services],
})
export class TypeModule {}
