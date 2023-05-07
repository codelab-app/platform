import type { ITypeTransformer } from '@codelab/backend/abstract/ports'
import { IAuthUseCase } from '@codelab/backend/abstract/types'
import {
  EnumType,
  InterfaceType,
  TypeFactory,
  UnionType,
} from '@codelab/backend/domain/type'
import type {
  IAtom,
  IAuth0Owner,
  IEnumTypeDTO,
  IField,
  IInterfaceTypeDTO,
  IPrimitiveTypeDTO,
  ITypeDTO,
  IUnionTypeDTO,
} from '@codelab/frontend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { systemTypesData } from '../../../data/system-types.data'
import {
  arrowFnReturnReactNode,
  es5FnReturnReactNode,
  parseSeparators,
} from '../../../parser'

interface Request {
  type: string
}

interface Props {
  atom: Pick<IAtom, 'name'>
  field: Pick<IField, 'key'>
  owner: IAuth0Owner
}

/**
 * Transform a string representation to the actual type
 *
 * - Will check if string format maps to a type
 *
 */
export class DefaultTypeAdapterService
  extends IAuthUseCase<Request, ITypeDTO | undefined>
  implements ITypeTransformer
{
  atom: Pick<IAtom, 'name'>

  field: Pick<IField, 'key'>

  reactNodeTypeRegex = /(([:|=>] (ReactNode|HTMLElement))|ReactNode)/

  renderPropTypeRegexes = [arrowFnReturnReactNode, es5FnReturnReactNode]

  booleanTypeRegex = /^boolean$/

  stringTypeRegex = /^string$/

  numberTypeRegex = /^number$/

  integerTypeRegex = /^integer$/

  /**
   * We consider it an interface if it has brackets
   */
  interfaceTypeRegex = /^\{.+}$/

  unionTypeRegex = /\|/

  actionTypeRegex = /(^function\(.*?\))|((\(.*?\)) => \w)/

  constructor({ atom, field, owner }: Props) {
    super(owner)

    this.atom = atom
    this.field = field
  }

  async _execute({ type }: Request) {
    if (this.isEnumType(type)) {
      return this.enumType(type)
    }

    if (this.isReactNodeType(type)) {
      return this.reactNodeType()
    }

    if (this.isRenderPropType(type)) {
      return this.renderPropType()
    }

    if (this.isActionType(type)) {
      return this.actionType()
    }

    if (this.isStringType(type)) {
      return this.stringType()
    }

    if (this.isBooleanType(type)) {
      return this.booleanType()
    }

    if (this.isNumberType(type)) {
      return this.numberType()
    }

    if (this.isIntegerType(type)) {
      return this.integerType()
    }

    if (this.isInterfaceType(type)) {
      return this.interfaceType()
    }

    if (this.isUnionType(type)) {
      return this.unionType(type)
    }

    return
  }

  isNumberType(type: string) {
    return this.numberTypeRegex.test(type)
  }

  isStringType(type: string) {
    return this.stringTypeRegex.test(type)
  }

  isEnumType(type: string) {
    if (this.interfaceTypeRegex.test(type)) {
      return false
    }

    return this.unionTypeRegex.test(type)
  }

  isBooleanType(type: string) {
    return this.booleanTypeRegex.test(type)
  }

  isActionType(type: string) {
    return this.actionTypeRegex.test(type)
  }

  isIntegerType(type: string) {
    return this.integerTypeRegex.test(type)
  }

  isUnionType(type: string) {
    return this.unionTypeRegex.test(type) && !this.interfaceTypeRegex.test(type)
  }

  isInterfaceType(type: string) {
    return this.interfaceTypeRegex.test(type)
  }

  isRenderPropType(type: string) {
    return this.renderPropTypeRegexes.some((regex) => regex.test(type))
  }

  actionType() {
    return systemTypesData(this.owner)[ITypeKind.ActionType]
  }

  reactNodeType() {
    return systemTypesData(this.owner)[ITypeKind.ReactNodeType]
  }

  renderPropType() {
    return systemTypesData(this.owner)[ITypeKind.RenderPropType]
  }

  interfaceType() {
    const interfaceTypeDTO: IInterfaceTypeDTO = {
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.getApiName(this.atom, {
        key: this.field.key,
      }),
      owner: this.owner,
    }

    return interfaceTypeDTO
  }

  booleanType() {
    return systemTypesData(this.owner)[IPrimitiveTypeKind.Boolean]
  }

  stringType() {
    return systemTypesData(this.owner)[IPrimitiveTypeKind.String]
  }

  numberType(): IPrimitiveTypeDTO {
    return systemTypesData(this.owner)[IPrimitiveTypeKind.Number]
  }

  integerType() {
    return systemTypesData(this.owner)[IPrimitiveTypeKind.Integer]
  }

  async unionType(type: string) {
    const typesOfUnionType = parseSeparators({ type })

    // Create data here

    const mappedTypesOfUnionType = (
      await Promise.all(
        typesOfUnionType.map(async (typeOfUnionType) => {
          return await new DefaultTypeAdapterService({
            atom: this.atom,
            field: this.field,
            owner: this.owner,
          }).execute({
            type: typeOfUnionType,
          })
        }),
      )
    ).filter((typeOfUnionType): typeOfUnionType is ITypeDTO =>
      Boolean(typeOfUnionType),
    )

    // Create nested types
    await Promise.all(
      mappedTypesOfUnionType.map(async ({ ...typeOfUnionType }) => {
        return await TypeFactory.create({
          ...typeOfUnionType,
          owner: this.owner,
        })
      }),
    )

    const unionType: IUnionTypeDTO = {
      __typename: ITypeKind.UnionType,
      id: v4(),
      kind: ITypeKind.UnionType,
      name: UnionType.compositeName(this.atom, {
        key: this.field.key,
      }),
      owner: this.owner,
      // These need to exist already
      typesOfUnionType: mappedTypesOfUnionType,
    }

    return unionType
  }

  enumType(type: string) {
    const values = parseSeparators({ type })

    const enumType: IEnumTypeDTO = {
      __typename: ITypeKind.EnumType,
      allowedValues: values.map((value) => ({
        id: v4(),
        key: value,
        value: value,
      })),
      id: v4(),
      kind: ITypeKind.EnumType,
      name: EnumType.compositeName(this.atom, {
        key: this.field.key,
      }),
      owner: this.owner,
    }

    return enumType
  }

  isReactNodeType(type: string) {
    return this.reactNodeTypeRegex.test(type)
  }
}
