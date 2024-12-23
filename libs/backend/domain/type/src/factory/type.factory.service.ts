import type { IRef, ITypeDto, ITypeRef } from '@codelab/shared/abstract/core'

import {
  getTypeDescendants,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { ITypeWhere, TypeCreateMap } from '@codelab/shared-domain-module/type'
import { Inject, Injectable } from '@nestjs/common'
import { TAnySchema } from '@sinclair/typebox'
import { Driver } from 'neo4j-driver'

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
  ) {}

  async descendantEntities(typeId: string) {
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

  async findOne({ __typename, id }: ITypeRef, schema?: TAnySchema) {
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
        console.log({ __typename })
        throw new Error('No type factory found')
      }
    }
  }

  async save<T extends ITypeDto>(
    type: TypeCreateMap[T['kind']]['dto'],
    where?: TypeCreateMap[T['kind']]['where'],
  ): Promise<IRef> {
    // console.log('Saving type', type, where)

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
        console.log('Data:', type)
        throw new Error('No type factory found')
      }
    }
  }
}
