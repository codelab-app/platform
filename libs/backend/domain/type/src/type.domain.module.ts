import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { UserDomainModule } from '@codelab/backend-domain-user'
import { Module } from '@nestjs/common'

import { TypeFactory } from './factory'
import {
  ActionTypeRepository,
  AnyTypeRepository,
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
  AnyTypeRepository,
]

@Module({
  exports: [TypeFactory, ...typeRepositories, TypeDomainService],
  imports: [SharedDomainModule, UserDomainModule],
  providers: [TypeFactory, ...typeRepositories, TypeDomainService],
})
export class TypeDomainModule {}
