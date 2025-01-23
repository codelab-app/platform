import type {
  INodeType,
  ITypeRef,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import type {
  UnionTypeOptions,
  UnionTypeWhere,
} from '@codelab/shared/infra/gqlgen'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { UnionTypeFragment } from '@codelab/shared/infra/gqlgen'
import {
  createTypeApi,
  findTypeApi,
  unionTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

const filterTypeIds = (
  typesOfUnionType: Array<ITypeRef>,
  kind: ITypeKind,
): Array<string> =>
  typesOfUnionType
    .filter((_type) => _type.__typename === kind)
    .map(({ id }) => id)

const getFilteredTypes = (typesOfUnionType: Array<ITypeRef>) => ({
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
  INodeType.UnionType,
  IUnionTypeDto,
  UnionTypeFragment,
  UnionTypeWhere,
  UnionTypeOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(unionTypes: Array<IUnionTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateUnionTypes({
      input: unionTypes.map((unionType) =>
        unionTypeMapper.toCreateInput(unionType),
      ),
    })

    return types
  }

  protected async _find(args: {
    where?: UnionTypeWhere
    options?: UnionTypeOptions
  }) {
    const { types } = await findTypeApi().GetUnionTypes(args)

    return types
  }

  protected async _update(unionType: IUnionTypeDto, where: UnionTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateUnionTypes({
      update: unionTypeMapper.toUpdateInput(unionType),
      where,
    })

    return types[0]
  }
}
