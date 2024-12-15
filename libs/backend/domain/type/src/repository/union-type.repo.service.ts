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
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { UnionTypeFragment } from '@codelab/shared/infra/gql'
import {
  createTypeApi,
  findTypeApi,
  unionTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
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
  UnionTypeFragment,
  UnionTypeWhere,
  UnionTypeOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(unionTypes: Array<IUnionTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi.CreateUnionTypes({
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
    const { types } = await findTypeApi.GetUnionTypes(args)

    return types
  }

  protected async _update(unionType: IUnionTypeDto, where: UnionTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi.UpdateUnionTypes({
      update: unionTypeMapper.toUpdateInput(unionType),
      where,
    })

    return types[0]
  }
}
