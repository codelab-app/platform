import type { IRef, ITypeDto, ITypeRef } from '@codelab/shared/abstract/core'

import { UserRepository } from '@codelab/backend/domain/user'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  getTypeDescendants,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { NotFoundError } from '@codelab/shared/domain/errors'
import { Maybe, TypeFragment } from '@codelab/shared/infra/gqlgen'
import { TypeCreateMap } from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'
import { TAnySchema } from '@sinclair/typebox'

import {
  ActionType,
  CodeMirrorType,
  EnumType,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  RichTextType,
  UnionType,
} from '../model'
import { ArrayType } from '../model/array-type.model'
import {
  ActionTypeRepository,
  ArrayTypeRepository,
  CodeMirrorTypeRepository,
  EnumTypeRepository,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  RichTextTypeRepository,
  UnionTypeRepository,
} from '../repository'

/**
 * Used for dynamic data when we don't know what type we are creating
 *
 * We create empty interface, then assign fields separately
 */
@Injectable()
export class TypeFactory {
  constructor(
    private readonly primitiveTypeRepository: PrimitiveTypeRepository,
    private readonly enumTypeRepository: EnumTypeRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly reactNodeTypeRepository: ReactNodeTypeRepository,
    private readonly renderPropTypeRepository: RenderPropTypeRepository,
    private readonly richTextTypeRepository: RichTextTypeRepository,
    private readonly actionTypeRepository: ActionTypeRepository,
    private readonly unionTypeRepository: UnionTypeRepository,
    private readonly arrayTypeRepository: ArrayTypeRepository,
    private readonly codeMirrorRepository: CodeMirrorTypeRepository,
    private readonly neo4jService: Neo4jService,
    private readonly logger: PinoLoggerService,
    private readonly userRepository: UserRepository,
  ) {}

  async add<T extends ITypeDto>(
    type: TypeCreateMap[T['kind']]['dto'],
  ): Promise<IRef> {
    this.logger.verbose('Adding new type', {
      context: 'TypeFactory',
      data: { type: type.__typename },
    })

    /**
     * Type narrow using discriminated union
     */
    switch (type.__typename) {
      case ITypeKind.ActionType: {
        const actionType = new ActionType(type)

        return await this.actionTypeRepository.add(actionType)
      }

      case ITypeKind.ArrayType: {
        const arrayType = new ArrayType(type)

        return await this.arrayTypeRepository.add(arrayType)
      }

      case ITypeKind.CodeMirrorType: {
        const codeMirrorType = new CodeMirrorType(type)

        return await this.codeMirrorRepository.add(codeMirrorType)
      }

      case ITypeKind.EnumType: {
        const enumType = new EnumType(type)

        return await this.enumTypeRepository.add(enumType)
      }

      case ITypeKind.InterfaceType: {
        const interfaceType = new InterfaceType(type)

        return await this.interfaceTypeRepository.add(interfaceType)
      }

      case ITypeKind.PrimitiveType: {
        const primitiveType = new PrimitiveType(type)

        return await this.primitiveTypeRepository.add(primitiveType)
      }

      case ITypeKind.ReactNodeType: {
        const reactNodeType = new ReactNodeType(type)

        return await this.reactNodeTypeRepository.add(reactNodeType)
      }

      case ITypeKind.RenderPropType: {
        const renderPropType = new RenderPropType(type)

        return await this.renderPropTypeRepository.add(renderPropType)
      }

      case ITypeKind.RichTextType: {
        const richTextType = new RichTextType(type)

        return await this.richTextTypeRepository.add(richTextType)
      }

      case ITypeKind.UnionType: {
        const unionType = new UnionType(type)

        return await this.unionTypeRepository.add(unionType)
      }

      default: {
        throw new Error('No type factory found')
      }
    }
  }

  async descendantEntities(typeId: string) {
    this.logger.verbose('Getting type descendants', {
      context: 'TypeFactory',
      data: { typeId },
    })

    const session = this.neo4jService.driver.session()

    const results = await session.run(getTypeDescendants, {
      id: typeId,
    })

    // We pass in a single id, so only get 1 record, for each record, we want the first column
    const descendants = [
      ...(results.records[0]?.values() ?? []),
    ][0] as Array<ITypeRef>

    // We only get interface type descendants, since other types are pushed in front of interfaces
    const sortedDescendants = descendants.sort((a, b) =>
      a.__typename === ITypeKind.InterfaceType ? 1 : -1,
    )

    return sortedDescendants
  }

  async findOne(
    { __typename, id }: ITypeRef,
    schema?: TAnySchema,
  ): Promise<Maybe<TypeFragment>> {
    this.logger.verbose('Finding type', {
      context: 'TypeFactory',
      data: { __typename, id },
    })

    switch (__typename) {
      case ITypeKind.ActionType: {
        return (await this.actionTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.ArrayType: {
        return (await this.arrayTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.CodeMirrorType: {
        return (await this.codeMirrorRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.EnumType: {
        return (await this.enumTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.InterfaceType: {
        return (await this.interfaceTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.PrimitiveType: {
        return (await this.primitiveTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.ReactNodeType: {
        return (await this.reactNodeTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.RenderPropType: {
        return (await this.renderPropTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.RichTextType: {
        return (await this.richTextTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      case ITypeKind.UnionType: {
        return (await this.unionTypeRepository).findOne({
          schema,
          where: { id },
        })
      }

      default: {
        throw new Error('No type factory found')
      }
    }
  }

  async findOneOrFail(
    { __typename, id }: ITypeRef,
    schema?: TAnySchema,
  ): Promise<TypeFragment> {
    this.logger.verbose('Finding type or fail', {
      context: 'TypeFactory',
      data: { __typename, id },
    })

    const found = await this.findOne({ __typename, id }, schema)

    if (!found) {
      throw new NotFoundError('Could not find type!', {
        where: { __typename, id },
      })
    }

    return found
  }

  async save<T extends ITypeDto>(
    type: TypeCreateMap[T['kind']]['dto'],
    where?: TypeCreateMap[T['kind']]['where'],
  ): Promise<IRef> {
    this.logger.verbose('Saving type', {
      context: 'TypeFactory',
      data: { type: type.__typename },
    })

    /**
     * Type narrow using discriminated union
     */
    switch (type.__typename) {
      case ITypeKind.ActionType: {
        const actionType = new ActionType(type)

        return await this.actionTypeRepository.save(actionType, where)
      }

      case ITypeKind.ArrayType: {
        const arrayType = new ArrayType(type)

        return await this.arrayTypeRepository.save(arrayType, where)
      }

      case ITypeKind.CodeMirrorType: {
        const codeMirrorType = new CodeMirrorType(type)

        return await this.codeMirrorRepository.save(codeMirrorType, where)
      }

      case ITypeKind.EnumType: {
        const enumType = new EnumType(type)

        return await this.enumTypeRepository.save(enumType, where)
      }

      case ITypeKind.InterfaceType: {
        const interfaceType = new InterfaceType(type)

        return await this.interfaceTypeRepository.save(interfaceType, where)
      }

      case ITypeKind.PrimitiveType: {
        const primitiveType = new PrimitiveType(type)

        return await this.primitiveTypeRepository.save(primitiveType, where)
      }

      case ITypeKind.ReactNodeType: {
        const reactNodeType = new ReactNodeType(type)

        return await this.reactNodeTypeRepository.save(reactNodeType, where)
      }

      case ITypeKind.RenderPropType: {
        const renderPropType = new RenderPropType(type)

        return await this.renderPropTypeRepository.save(renderPropType, where)
      }

      case ITypeKind.RichTextType: {
        const richTextType = new RichTextType(type)

        return await this.richTextTypeRepository.save(richTextType, where)
      }

      case ITypeKind.UnionType: {
        const unionType = new UnionType(type)

        return await this.unionTypeRepository.save(unionType, where)
      }

      default: {
        throw new Error('No type factory found')
      }
    }
  }
}
