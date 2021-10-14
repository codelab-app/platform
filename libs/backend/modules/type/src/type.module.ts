import { Void } from '@codelab/backend/abstract/types'
import { CytoscapeModule } from '@codelab/backend/shared/generic'
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
import { TagAdapter } from '@codelab/backend/modules/tag'
import { ArrayTypeAdapter } from './application/adapters/array-type.adapter'
import { ReactNodeAdapter } from './application/adapters/react-node-type.adapter'
import { RenderPropsAdapter } from './application/adapters/render-props-type.adapter'
import { UnionTypeAdapter } from './application/adapters/union-type-adapter'
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
import { SeedBaseTypesService } from './use-cases/type/seed-base-types'
import { UpdateEnumTypeService } from './use-cases/type/update-enum-type'
import { UpdatePrimitiveTypeService } from './use-cases/type/update-primitive-type'
import { UpdateTypeService } from './use-cases/type/update-type'
import { UpdateUnionTypeService } from './use-cases/type/update-union-type'
import { UpdateTagsOftypeService } from './use-cases/type/update-tags-of-type'

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
  UpdateUnionTypeService,
  UpdateTypeService,
  UpdateTagsOftypeService,
  ImportApiService,
  SeedBaseTypesService,
  /**
   * Adapters
   */
  TagAdapter,
  InterfaceTypeAdapter,
  RenderPropsAdapter,
  ReactNodeAdapter,
  ArrayTypeAdapter,
  ComponentTypeAdapter,
  TypeAdapterFactory,
  PrimitiveTypeAdapter,
  EnumTypeAdapter,
  EnumTypeValueAdapter,
  UnionTypeAdapter,
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
  imports: [CytoscapeModule],
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
