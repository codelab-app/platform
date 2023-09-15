import type {
  UnionType,
  UnionTypeOptions,
  UnionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthService } from '@codelab/backend/application/shared'
import {
  exportUnionTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { ITypeEntity, IUnionTypeDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeIds,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

const filterTypeIds = (
  typesOfUnionType: Array<ITypeEntity>,
  kind: ITypeKind,
): Array<string> =>
  typesOfUnionType
    .filter((_type) => _type.__typename === kind)
    .map(({ id }) => id)

const getFilteredTypes = (typesOfUnionType: Array<ITypeEntity>) => ({
  arrayTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.ArrayType),
  enumTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.EnumType),
  interfaceTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.InterfaceType),
  primitiveTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.PrimitiveType),
  reactNodeTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.ReactNodeType),
  renderPropTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.RenderPropType),
})

@Injectable()
export class UnionTypeRepository extends AbstractRepository<
  IUnionTypeDTO,
  UnionType,
  UnionTypeWhere,
  UnionTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthService,
  ) {
    super(traceService, validationService)
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
      selectionSet: exportUnionTypeSelectionSet,
      where,
    })
  }

  protected async _add(unionTypes: Array<IUnionTypeDTO>) {
    return (
      await (
        await this.ogmService.UnionType
      ).create({
        input: unionTypes.map(
          ({ __typename, id, kind, name, typesOfUnionType }) => {
            const {
              arrayTypeIds,
              enumTypeIds,
              interfaceTypeIds,
              primitiveTypeIds,
              reactNodeTypeIds,
              renderPropTypeIds,
            } = getFilteredTypes(typesOfUnionType)

            return {
              id,
              kind,
              name,
              owner: connectAuth0Owner(this.authService.currentUser),
              typesOfUnionType: {
                ArrayType: connectNodeIds(arrayTypeIds),
                EnumType: connectNodeIds(enumTypeIds),
                InterfaceType: connectNodeIds(interfaceTypeIds),
                PrimitiveType: connectNodeIds(primitiveTypeIds),
                ReactNodeType: connectNodeIds(reactNodeTypeIds),
                RenderPropType: connectNodeIds(renderPropTypeIds),
              },
            }
          },
        ),
        selectionSet: `{ unionTypes ${exportUnionTypeSelectionSet} }`,
      })
    ).unionTypes
  }

  protected async _update(
    { id, name, typesOfUnionType }: IUnionTypeDTO,
    where: UnionTypeWhere,
  ) {
    const {
      arrayTypeIds,
      enumTypeIds,
      interfaceTypeIds,
      primitiveTypeIds,
      reactNodeTypeIds,
      renderPropTypeIds,
    } = getFilteredTypes(typesOfUnionType)

    return (
      await (
        await this.ogmService.UnionType
      ).update({
        selectionSet: `{ unionTypes ${exportUnionTypeSelectionSet} }`,
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
          },
        },
        where,
      })
    ).unionTypes[0]
  }
}
