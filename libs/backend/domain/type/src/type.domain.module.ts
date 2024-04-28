import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { TypeFactory } from './factory'
import {
  ActionTypeRepository,
  ArrayTypeRepository,
  CodeMirrorTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  RichTextTypeRepository,
  UnionTypeRepository,
} from './repository'
import { TypeDomainService } from './service'

const typeRepositories = [
  ActionTypeRepository,
  ArrayTypeRepository,
  CodeMirrorTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  RichTextTypeRepository,
  UnionTypeRepository,
]

@Module({
  exports: [TypeFactory, ...typeRepositories, TypeDomainService],
  imports: [SharedDomainModule],
  providers: [TypeFactory, ...typeRepositories, TypeDomainService],
})
export class TypeDomainModule {}
