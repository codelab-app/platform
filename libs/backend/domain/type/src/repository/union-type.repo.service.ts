import type {
  UnionType,
  UnionTypeOptions,
  UnionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type {
  ITypeMaybeRef,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  OgmService,
  unionTypeSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain-old'
import { Injectable } from '@nestjs/common'

const filterTypeIds = (
  typesOfUnionType: Array<ITypeMaybeRef>,
  kind: ITypeKind,
): Array<string> =>
  typesOfUnionType
    .filter((_type) => _type.__typename === kind)
    .map(({ id }) => id)

const getFilteredTypes = (typesOfUnionType: Array<ITypeMaybeRef>) => ({
  arrayTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.ArrayType),
  codeMirrorTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.CodeMirrorType),
  enumTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.EnumType),
  interfaceTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.InterfaceType),
  primitiveTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.PrimitiveType),
  reactNodeTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.ReactNodeType),
  renderPropTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.RenderPropType),
  richTextTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.RichTextType),
})

@Injectable()
export class UnionTypeRepository extends AbstractRepository<
  IUnionTypeDto,
  UnionType,
  UnionTypeWhere,
  UnionTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(unionTypes: Array<IUnionTypeDto>) {
    return (
      await (
        await this.ogmService.UnionType
      ).create({
        input: unionTypes.map(
          ({ __typename, id, kind, name, owner, typesOfUnionType }) => {
            const {
              arrayTypeIds,
              codeMirrorTypeIds,
              enumTypeIds,
              interfaceTypeIds,
              primitiveTypeIds,
              reactNodeTypeIds,
              renderPropTypeIds,
              richTextTypeIds,
            } = getFilteredTypes(typesOfUnionType)

            return {
              id,
              kind,
              name,
              owner: connectOwner(owner),
              typesOfUnionType: {
                ArrayType: connectNodeIds(arrayTypeIds),
                CodeMirrorType: connectNodeIds(codeMirrorTypeIds),
                EnumType: connectNodeIds(enumTypeIds),
                InterfaceType: connectNodeIds(interfaceTypeIds),
                PrimitiveType: connectNodeIds(primitiveTypeIds),
                ReactNodeType: connectNodeIds(reactNodeTypeIds),
                RenderPropType: connectNodeIds(renderPropTypeIds),
                RichTextType: connectNodeIds(richTextTypeIds),
              },
            }
          },
        ),
      })
    ).unionTypes
  }

  protected async _find({
    options,
    where,
  }: {
    where?: UnionTypeWhere
    options?: UnionTypeOptions
  }) {
    return await (
      await this.ogmService.UnionType
    ).find({
      options,
      selectionSet: `{ ${unionTypeSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { id, name, typesOfUnionType }: IUnionTypeDto,
    where: UnionTypeWhere,
  ) {
    const {
      arrayTypeIds,
      enumTypeIds,
      interfaceTypeIds,
      primitiveTypeIds,
      reactNodeTypeIds,
      renderPropTypeIds,
      richTextTypeIds,
    } = getFilteredTypes(typesOfUnionType)

    return (
      await (
        await this.ogmService.UnionType
      ).update({
        update: {
          id,
          name,
          typesOfUnionType: {
            ArrayType: reconnectNodeIds(arrayTypeIds),
            EnumType: reconnectNodeIds(enumTypeIds),
            InterfaceType: reconnectNodeIds(interfaceTypeIds),
            PrimitiveType: reconnectNodeIds(primitiveTypeIds),
            ReactNodeType: reconnectNodeIds(reactNodeTypeIds),
            RenderPropType: reconnectNodeIds(renderPropTypeIds),
            RichTextType: reconnectNodeIds(richTextTypeIds),
          },
        },
        where,
      })
    ).unionTypes[0]
  }
}
