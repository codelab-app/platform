import type { AntDesignField } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import {
  ActionType,
  EnumType,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  ReactNodeTypeRepository,
  RenderPropsType,
  RenderPropsTypeRepository,
  TypeFactory,
  UnionType,
  UnionTypeRepository,
} from '@codelab/backend/domain/type'
import type {
  IAtomDTO,
  IAuth0Owner,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { AntDesignTypeMapper } from '../../mapper'
import {
  isActionType,
  isEnumType,
  isInterfaceType,
  isPrimitiveType,
  isReactNodeType,
  isRenderPropsType,
  isUnionType,
  parseSeparators,
} from '../../parser'
import { systemTypesData } from '../seed-system-type/system-types.data'

interface Request {
  atom: IAtomDTO
  field: Pick<AntDesignField, 'property' | 'type'>
  owner: IAuth0Owner
}

export class TransformAntDesignTypesService extends IUseCase<
  Request,
  ITypeDTO | undefined
> {
  reactNodeTypeRepository = new ReactNodeTypeRepository()

  renderPropsTypeRepository = new RenderPropsTypeRepository()

  unionTypeRepository = new UnionTypeRepository()

  protected async _execute({ atom, field, owner }: Request) {
    if (isEnumType(field.type)) {
      const values = parseSeparators(field)

      const enumType = new EnumType({
        allowedValues: values.map((value) => ({
          id: v4(),
          key: value,
          value: value,
        })),
        id: v4(),
        kind: ITypeKind.EnumType,
        name: EnumType.getCompositeName(atom, { key: field.property }),
        owner,
      })

      return enumType
    }

    if (isReactNodeType(field.type)) {
      const reactNodeType = systemTypesData(owner)[ITypeKind.ReactNodeType]

      return new ReactNodeType(reactNodeType)
    }

    if (isPrimitiveType(field.type)) {
      const primitiveKind = AntDesignTypeMapper.mapPrimitiveType(field.type)
      const primitiveType = systemTypesData(owner)[primitiveKind]

      return new PrimitiveType(primitiveType)
    }

    if (isRenderPropsType(field.type)) {
      const renderPropsType = systemTypesData(owner)[ITypeKind.RenderPropsType]

      return new RenderPropsType(renderPropsType)
    }

    if (isActionType(field.type)) {
      const actionType = systemTypesData(owner)[ITypeKind.ActionType]

      return new ActionType(actionType)
    }

    if (isInterfaceType(field.type)) {
      return new InterfaceType({
        fields: [],
        id: v4(),
        kind: ITypeKind.InterfaceType,
        name: InterfaceType.getApiName(atom, { key: field.property }),
        owner,
      })
    }

    if (isUnionType(field.type)) {
      const typesOfUnionType = parseSeparators(field)

      // Create data here
      const mappedTypesOfUnionType = (
        await Promise.all(
          typesOfUnionType.map(async (typeOfUnionType) => {
            return await new TransformAntDesignTypesService().execute({
              atom,
              field: { ...field, type: typeOfUnionType },
              owner,
            })
          }),
        )
      ).filter((typeOfUnionType): typeOfUnionType is ITypeDTO =>
        Boolean(typeOfUnionType),
      )

      // Create nested types
      await Promise.all(
        mappedTypesOfUnionType.map(async ({ ...typeOfUnionType }) => {
          return await TypeFactory.create({ ...typeOfUnionType, owner })
        }),
      )

      const unionType = new UnionType({
        id: v4(),
        kind: ITypeKind.UnionType,
        name: UnionType.compositeName(atom, { key: field.property }),
        owner,
        // These need to exist already
        typesOfUnionType: mappedTypesOfUnionType,
      })

      return unionType
    }

    return undefined
  }
}
