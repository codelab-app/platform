import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { TypeFactory } from './factory'
import {
  ActionTypeRepository,
  ArrayTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  UnionTypeRepository,
} from './repository'

@Module({
  exports: [
    TypeFactory,
    ActionTypeRepository,
    ArrayTypeRepository,
    EnumTypeRepository,
    FieldRepository,
    InterfaceTypeRepository,
    PrimitiveTypeRepository,
    ReactNodeTypeRepository,
    RenderPropTypeRepository,
    UnionTypeRepository,
  ],
  imports: [OgmModule, ValidationModule],
  providers: [
    TypeFactory,
    ActionTypeRepository,
    ArrayTypeRepository,
    EnumTypeRepository,
    FieldRepository,
    InterfaceTypeRepository,
    PrimitiveTypeRepository,
    ReactNodeTypeRepository,
    RenderPropTypeRepository,
    UnionTypeRepository,
  ],
})
export class TypeDomainModule {}
