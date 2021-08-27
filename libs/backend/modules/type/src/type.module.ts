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
import { FieldResolver } from './application/field.resolver'
import { TypeResolver } from './application/type.resolver'
import { TypeGraphResolver } from './application/type-graph.resolver'
import { FieldValidator } from './domain/field.validator'
import { TypeValidator } from './domain/type.validator'
import { CreateFieldService } from './use-cases/field/create-field'
import { DeleteFieldService } from './use-cases/field/delete-field'
import { GetFieldService } from './use-cases/field/get-field'
import { UpdateFieldService } from './use-cases/field/update-field'
import { CreateTypeService } from './use-cases/type/create-type'
import { DeleteTypeService } from './use-cases/type/delete-type'
import { GetTypeService } from './use-cases/type/get-type'
import { GetTypesService } from './use-cases/type/get-types'
import { ImportApiService } from './use-cases/type/import-api'
import { UpdateEnumTypeService } from './use-cases/type/update-enum-type'
import { UpdatePrimitiveTypeService } from './use-cases/type/update-primitive-type'
import { UpdateTypeService } from './use-cases/type/update-type'

const fieldServices = [
  /**
   * Use Cases
   */
  CreateFieldService,
  DeleteFieldService,
  GetFieldService,
  UpdateFieldService,
  /**
   * Adapters
   */
  FieldAdapter,
  /**
   * Validators
   */
  FieldValidator,
  TypeValidator,
]

const typeServices = [
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

const services = [...fieldServices, ...typeServices]

@Module({
  imports: [CytoscapeModule, TreeModule],
  providers: [
    TypeResolver,
    FieldResolver,
    TypeGraphResolver,
    Void,
    ...services,
  ],
  exports: [...services],
})
export class TypeModule {}
