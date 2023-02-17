import type {
  AntDesignField,
  IAtom,
  IType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import {
  ActionTypeRepository,
  EnumType,
  InterfaceType,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
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
  owner: IUserRef
}

const throwError = (type: string) => {
  throw new Error(`${type} should have been seeded already`)
}

export class TransformAntDesignTypesService extends IUseCase<
  Request,
  IType | undefined
> {
  reactNodeTypeRepository = new ReactNodeTypeRepository()

  primitiveTypeRepository = new PrimitiveTypeRepository()

  interfaceTypeRepository = new InterfaceTypeRepository()

  renderPropsTypeRepository = new RenderPropsTypeRepository()

  unionTypeRepository = new UnionTypeRepository()

  actionTypeRepository = new ActionTypeRepository()

  protected async _execute({ field, atom, owner }: Request) {
    if (isEnumType(field.type)) {
      const values = parseSeparators(field)

      const enumType = EnumType.init({
        id: v4(),
        __typename: ITypeKind.EnumType,
        name: EnumType.getCompositeName(atom, { key: field.property }),
        owner,
        allowedValues: values.map((value) => ({
          id: v4(),
          key: value,
          value: value,
        })),
      })

      return enumType
    }

    if (isReactNodeType(field.type)) {
      return ReactNodeType.init({
        owner,
        __typename: ITypeKind.ReactNodeType,
      })
    }

    if (isPrimitiveType(field.type)) {
      const primitiveKind = AntDesignTypeMapper.mapPrimitiveType(field.type)

      console.log('Map primitiveType', field.type, primitiveKind)

      const primitiveType = await this.primitiveTypeRepository.find({
        name: primitiveKind,
      })

      if (!primitiveType) {
        throwError(`PrimitiveType ${primitiveKind}`)
      }

      return primitiveType
    }

    if (isRenderPropsType(field.type)) {
      const renderPropsType = await this.renderPropsTypeRepository.find({
        name: ITypeKind.RenderPropsType,
      })

      if (!renderPropsType) {
        throwError(ITypeKind.RenderPropsType)
      }

      return RenderPropsType.init({
        owner,
        __typename: ITypeKind.RenderPropsType,
      })
    }

    if (isActionType(field.type)) {
      const actionType = await this.actionTypeRepository.find({
        name: ITypeKind.ActionType,
      })

      if (!actionType) {
        throwError(ITypeKind.ActionType)
      }
    }

    if (isInterfaceType(field.type)) {
      const interfaceTypeName = InterfaceType.getApiName(atom, {
        key: field.property,
      })

      const interfaceType = await this.interfaceTypeRepository.find({
        name: interfaceTypeName,
      })

      if (!interfaceType) {
        const newInterfaceType = InterfaceType.init({
          name: InterfaceType.getApiName(atom, { key: field.property }),
          owner,
          __typename: ITypeKind.InterfaceType,
          fields: [],
        })

        // this.interfaceTypeRepository.
      }
    }

    if (isUnionType(field.type)) {
      const typesOfUnionType = parseSeparators(field)

      // Create data here
      const mappedTypesOfUnionType = (
        await Promise.all(
          typesOfUnionType.map(async (typeOfUnionType) => {
            return await new TransformAntDesignTypesService().execute({
              field: { ...field, type: typeOfUnionType },
              atom,
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
          return await TypeFactory.create(typeOfUnionType, owner)
        }),
      )

      const unionTypeName = UnionType.compositeName(atom, {
        key: field.property,
      })

      // const unionType = UnionType.init({
      //   owner,
      //   __typename: ITypeKind.UnionType,
      //   name: UnionType.compositeName(atom, { key: field.property }),
      //   // These need to exist already
      //   typesOfUnionType: mappedTypesOfUnionType,
      // })

      const unionType = this.unionTypeRepository.find({
        name: unionTypeName,
      })

      return unionType
    }

    return undefined
  }
}
