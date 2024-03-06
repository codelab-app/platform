/* eslint-disable @typescript-eslint/member-ordering */
import type {
  EnumType as IEnumType,
  InterfaceType as IInterfaceType,
  UnionType as IUnionType,
} from '@codelab/backend/abstract/codegen'
import type { IType } from '@codelab/backend/abstract/core'
import type { ITypeTransformer } from '@codelab/backend/abstract/ports'
import {
  ActionTypeRepository,
  EnumType,
  InterfaceType,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  TypeFactory,
  UnionType,
} from '@codelab/backend/domain/type'
import type {
  IAtomDto,
  IEnumTypeDto,
  IFieldDto,
  IInterfaceTypeDto,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import {
  arrowFnReturnReactNode,
  es5FnReturnReactNode,
  parseSeparators,
} from '../../../parser'

interface Request {
  atom: Pick<IAtomDto, 'name'>
  field: Pick<IFieldDto, 'key'>
  /**
   * Type of the field from framework
   */
  type: string
}

/**
 * Transform a string representation to the actual type
 *
 * - Will check if string format maps to a type
 *
 */
@Injectable()
export class DefaultTypeAdapterService implements ITypeTransformer {
  actionTypeRegex = /(^function\(.*?\))|((\(.*?\)) => \w)/

  arrayTypeRegex = /\[\]$/

  booleanTypeRegex = /^boolean$/

  containsInterfaceTypeRegex = /{[\s\S]*}/

  enumTypeRegex = /\|/

  integerTypeRegex = /^integer$/

  /**
   * This pattern ensures that it will match any string that starts with a { and ends with a }, even if there are multiple lines or nested objects within the interface type. The [\s\S]* part of the regex pattern matches any character, including whitespace and non-whitespace characters, zero or more times.
   */
  interfaceTypeRegex = /^\{[\s\S]*}$/

  numberTypeRegex = /^number$/

  reactNodeTypeRegex = /(([:|=>] (ReactNode|HTMLElement))|ReactNode)/

  renderPropTypeRegexes = [arrowFnReturnReactNode, es5FnReturnReactNode]

  stringTypeRegex = /^string$/

  constructor(
    private primitiveTypeRepository: PrimitiveTypeRepository,
    private actionTypeRepository: ActionTypeRepository,
    private reactNodeTypeRepository: ReactNodeTypeRepository,
    private renderPropTypeRepository: RenderPropTypeRepository,
    private typeFactory: TypeFactory,
  ) {}

  async execute(request: Request): Promise<IType | undefined> {
    const { atom, field, type } = request

    const typeChecks = [
      {
        check: this.isEnumType.bind(this),
        transform: this.enumType.bind(this),
      },
      {
        check: this.isReactNodeType.bind(this),
        transform: this.reactNodeType.bind(this),
      },
      {
        check: this.isRenderPropType.bind(this),
        transform: this.renderPropType.bind(this),
      },
      {
        check: this.isActionType.bind(this),
        transform: this.actionType.bind(this),
      },
      {
        check: this.isStringType.bind(this),
        transform: this.stringType.bind(this),
      },
      {
        check: this.isBooleanType.bind(this),
        transform: this.booleanType.bind(this),
      },
      {
        check: this.isNumberType.bind(this),
        transform: this.numberType.bind(this),
      },
      {
        check: this.isIntegerType.bind(this),
        transform: this.integerType.bind(this),
      },
      {
        check: this.isInterfaceType.bind(this),
        transform: this.interfaceType.bind(this),
      },
      {
        check: this.isUnionType.bind(this),
        transform: this.unionType.bind(this),
      },
    ]

    const matchingTypeChecks = typeChecks.filter(({ check }) => check(type))

    if (matchingTypeChecks.length === 0) {
      console.warn(
        `No matching type check found for type: ${type}. Consider improving the code to handle this case.`,
      )

      return
    }

    if (matchingTypeChecks.length > 1) {
      const matchedKinds = matchingTypeChecks.map(
        ({ transform }) => transform.name,
      )

      console.error(
        `More than one type check matched for type: ${type}. The type checks should be mutually exclusive. Matched kinds: ${matchedKinds.join(
          ', ',
        )}`,
      )

      throw new Error(
        `More than one type check matched for type: ${type}. The type checks should be mutually exclusive.`,
      )
    }

    return await matchingTypeChecks[0]?.transform(type, atom, field)
  }

  // async arrayType(type: string): Promise<IArrayType> {
  //   const arrayType: IArrayTypeDTO = {
  //     __typename: ITypeKind.ArrayType,
  //     itemType: { id: '' },
  //   }

  //   return await TypeFactory.save<IArrayType>(arrayType)
  // }

  async actionType() {
    return await this.actionTypeRepository.findOneOrFail({
      where: { name: ITypeKind.ActionType },
    })
  }

  async booleanType() {
    return await this.primitiveTypeRepository.findOneOrFail({
      where: {
        name: IPrimitiveTypeKind.Boolean,
      },
    })
  }

  async enumType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ) {
    const values = parseSeparators({ type })

    const enumType: IEnumTypeDto = {
      __typename: ITypeKind.EnumType,
      allowedValues: values.map((value) => ({
        id: v4(),
        key: value,
        value: value,
      })),
      id: v4(),
      kind: ITypeKind.EnumType,
      name: EnumType.compositeName(atom, field),
    }

    return await this.typeFactory.save<IEnumType>(enumType)
  }

  async integerType() {
    return await this.primitiveTypeRepository.findOneOrFail({
      where: {
        name: IPrimitiveTypeKind.Integer,
      },
    })
  }

  async interfaceType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ) {
    const interfaceType: IInterfaceTypeDto = {
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.getApiName(atom, {
        key: field.key,
      }),
    }

    return await this.typeFactory.save<IInterfaceType>(interfaceType)
  }

  async numberType() {
    return await this.primitiveTypeRepository.findOneOrFail({
      where: {
        name: IPrimitiveTypeKind.Number,
      },
    })
  }

  async reactNodeType() {
    return await this.reactNodeTypeRepository.findOneOrFail({
      where: {
        name: ITypeKind.ReactNodeType,
      },
    })
  }

  async renderPropType() {
    return await this.renderPropTypeRepository.findOneOrFail({
      where: {
        name: ITypeKind.RenderPropType,
      },
    })
  }

  async stringType() {
    return await this.primitiveTypeRepository.findOneOrFail({
      where: {
        name: IPrimitiveTypeKind.String,
      },
    })
  }

  async unionType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ) {
    const typesOfUnionType = parseSeparators({ type })

    const mappedTypesOfUnionType = (
      await Promise.all(
        typesOfUnionType.map(async (typeOfUnionType) => {
          return await this.execute({
            atom,
            field,
            type: typeOfUnionType,
          })
        }),
      )
    ).filter((typeOfUnionType): typeOfUnionType is IType =>
      Boolean(typeOfUnionType),
    )

    // Create nested types
    await Promise.all(
      mappedTypesOfUnionType.map(async ({ ...typeOfUnionType }) => {
        return await this.typeFactory.save(typeOfUnionType)
      }),
    )

    const unionType: IUnionTypeDto = {
      __typename: ITypeKind.UnionType,
      id: v4(),
      kind: ITypeKind.UnionType,
      name: UnionType.compositeName(atom, field),
      // These need to exist already
      typesOfUnionType: mappedTypesOfUnionType,
    }

    return await this.typeFactory.save<IUnionType>(unionType)
  }

  private isActionType(type: string) {
    return this.actionTypeRegex.test(type) && !this.isReactNodeType(type)
  }

  private isArrayType(type: string) {
    return this.arrayTypeRegex.test(type)
  }

  private isBooleanType(type: string) {
    return this.booleanTypeRegex.test(type)
  }

  /**
   * Must be a union type if contains a nested interface type
   */
  private isEnumType(type: string) {
    if (this.containsInterfaceTypeRegex.test(type)) {
      return false
    }

    return this.enumTypeRegex.test(type)
  }

  private isIntegerType(type: string) {
    return this.integerTypeRegex.test(type)
  }

  private isInterfaceType(type: string) {
    return this.interfaceTypeRegex.test(type)
  }

  private isNumberType(type: string) {
    return this.numberTypeRegex.test(type)
  }

  private isReactNodeType(type: string) {
    return this.reactNodeTypeRegex.test(type)
  }

  private isRenderPropType(type: string) {
    return this.renderPropTypeRegexes.some((regex) => regex.test(type))
  }

  private isStringType(type: string) {
    return this.stringTypeRegex.test(type)
  }

  private isUnionType(type: string) {
    return this.enumTypeRegex.test(type) && this.interfaceTypeRegex.test(type)
  }
}
