import type {
  AntDesignField,
  IAtom,
  IOwner,
  IType,
} from '@codelab/backend/abstract/core'
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

interface Request {
  field: Pick<AntDesignField, 'type' | 'property'>
  atom: IAtom
  owner: IOwner
}

export class TransformAntDesignTypesService extends IUseCase<
  Request,
  IType | undefined
> {
  reactNodeTypeRepository = new ReactNodeTypeRepository()

  renderPropsTypeRepository = new RenderPropsTypeRepository()

  unionTypeRepository = new UnionTypeRepository()

  protected async _execute({ field, atom, owner }: Request) {
    if (isEnumType(field.type)) {
      const values = parseSeparators(field)

      const enumType = EnumType.init({
        __typename: ITypeKind.EnumType,
        allowedValues: values.map((value) => ({
          id: v4(),
          key: value,
          value: value,
        })),
        id: v4(),
        name: EnumType.getCompositeName(atom, { key: field.property }),
        owner,
      })

      return enumType
    }

    if (isReactNodeType(field.type)) {
      return ReactNodeType.init({
        id: v4(),
        owner,
      })
    }

    if (isPrimitiveType(field.type)) {
      const primitiveKind = AntDesignTypeMapper.mapPrimitiveType(field.type)

      return PrimitiveType.init({
        id: v4(),
        owner,
        primitiveKind,
      })
    }

    if (isRenderPropsType(field.type)) {
      return RenderPropsType.init({
        __typename: ITypeKind.RenderPropsType,
        id: v4(),
        owner,
      })
    }

    if (isActionType(field.type)) {
      return ActionType.init({
        __typename: ITypeKind.ActionType,
        id: v4(),
        owner,
      })
    }

    if (isInterfaceType(field.type)) {
      return InterfaceType.init({
        __typename: ITypeKind.InterfaceType,
        fields: [],
        id: v4(),
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
      ).filter((typeOfUnionType): typeOfUnionType is IType =>
        Boolean(typeOfUnionType),
      )

      // Create nested types
      await Promise.all(
        mappedTypesOfUnionType.map(async ({ ...typeOfUnionType }) => {
          return await TypeFactory.create({ ...typeOfUnionType, owner })
        }),
      )

      const unionType = UnionType.init({
        __typename: ITypeKind.UnionType,
        id: v4(),
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
