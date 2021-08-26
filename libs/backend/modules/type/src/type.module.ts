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
import { TypeGraphResolver } from './application/type-graph.resolver'
import { TypeValidator } from './domain/type.validator'
import { CreateTypeService } from './use-cases/type/create-type'
import { DeleteTypeService } from './use-cases/type/delete-type'
import { GetTypeService } from './use-cases/type/get-type'
import { GetTypesService } from './use-cases/type/get-types'
import { ImportApiService } from './use-cases/type/import-api'
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
  ImportApiService,
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

@Module({
  imports: [CytoscapeModule, TreeModule],
  providers: [TypeResolver, TypeGraphResolver, Void, ...services],
  exports: [...services],
})
export class TypeModule {}
