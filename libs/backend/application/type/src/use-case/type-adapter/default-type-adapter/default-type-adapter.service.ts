import type { IType } from '@codelab/backend/abstract/core'
import type { ITypeTransformer } from '@codelab/backend/abstract/ports'
import { IAuthUseCase } from '@codelab/backend/abstract/types'
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
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type {
  IAtomDTO,
  IAuth0Owner,
  IEnumTypeDTO,
  IFieldDTO,
  IInterfaceTypeDTO,
  IUnionTypeDTO,
} from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import {
  arrowFnReturnReactNode,
  es5FnReturnReactNode,
  parseSeparators,
} from '../../../parser'

interface Request {
  type: string
}

interface Props {
  atom: Pick<IAtomDTO, 'name'>
  field: Pick<IFieldDTO, 'key'>
  owner: IAuth0Owner
}

/**
 * Transform a string representation to the actual type
 *
 * - Will check if string format maps to a type
 *
 */
export class DefaultTypeAdapterService
  extends IAuthUseCase<Request, IType | undefined>
  implements ITypeTransformer
{
  primitiveTypeRepository = new PrimitiveTypeRepository()

  actionTypeRepository = new ActionTypeRepository()

  reactNodeTypeRepository = new ReactNodeTypeRepository()

  renderPropTypeRepository = new RenderPropTypeRepository()

  atom: Pick<IAtomDTO, 'name'>

  field: Pick<IFieldDTO, 'key'>

  reactNodeTypeRegex = /(([:|=>] (ReactNode|HTMLElement))|ReactNode)/

  renderPropTypeRegexes = [arrowFnReturnReactNode, es5FnReturnReactNode]

  booleanTypeRegex = /^boolean$/

  stringTypeRegex = /^string$/

  numberTypeRegex = /^number$/

  integerTypeRegex = /^integer$/

  /**
   * This pattern ensures that it will match any string that starts with a { and ends with a }, even if there are multiple lines or nested objects within the interface type. The [\s\S]* part of the regex pattern matches any character, including whitespace and non-whitespace characters, zero or more times.
   */
  interfaceTypeRegex = /^\{[\s\S]*}$/

  containsInterfaceTypeRegex = /{[\s\S]*}/

  unionTypeRegex = /\|/

  actionTypeRegex = /(^function\(.*?\))|((\(.*?\)) => \w)/

  constructor({ atom, field, owner }: Props) {
    super(owner)

    this.atom = atom
    this.field = field
  }

  async _execute({ type }: Request) {
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

    return await matchingTypeChecks[0]?.transform(type)
  }

  isNumberType(type: string) {
    return this.numberTypeRegex.test(type)
  }

  isStringType(type: string) {
    return this.stringTypeRegex.test(type)
  }

  /**
   * Must be a union type if contains a nested interface type
   */
  isEnumType(type: string) {
    if (this.containsInterfaceTypeRegex.test(type)) {
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

  async actionType() {
    return throwIfUndefined(
      await this.actionTypeRepository.findOne({ name: ITypeKind.ActionType }),
    )
  }

  async reactNodeType() {
    return throwIfUndefined(
      await this.reactNodeTypeRepository.findOne({
        name: ITypeKind.ReactNodeType,
      }),
    )
  }

  async renderPropType() {
    return throwIfUndefined(
      await this.renderPropTypeRepository.findOne({
        name: ITypeKind.RenderPropType,
      }),
    )
  }

  async interfaceType() {
    const interfaceType: IInterfaceTypeDTO = {
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.getApiName(this.atom, {
        key: this.field.key,
      }),
      owner: this.owner,
    }

    return await TypeFactory.save<OGM_TYPES.InterfaceType>(interfaceType)
  }

  async booleanType() {
    return throwIfUndefined(
      await this.primitiveTypeRepository.findOne({
        name: IPrimitiveTypeKind.Boolean,
      }),
    )
  }

  async stringType() {
    return throwIfUndefined(
      await this.primitiveTypeRepository.findOne({
        name: IPrimitiveTypeKind.String,
      }),
    )
  }

  async numberType() {
    return throwIfUndefined(
      await this.primitiveTypeRepository.findOne({
        name: IPrimitiveTypeKind.Number,
      }),
    )
  }

  async integerType() {
    return throwIfUndefined(
      await this.primitiveTypeRepository.findOne({
        name: IPrimitiveTypeKind.Integer,
      }),
    )
  }

  async unionType(type: string) {
    const typesOfUnionType = parseSeparators({ type })

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
    ).filter((typeOfUnionType): typeOfUnionType is IType =>
      Boolean(typeOfUnionType),
    )

    // Create nested types
    await Promise.all(
      mappedTypesOfUnionType.map(async ({ ...typeOfUnionType }) => {
        return await TypeFactory.save({
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

    return await TypeFactory.save<OGM_TYPES.UnionType>(unionType)
  }

  async enumType(type: string) {
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

    return await TypeFactory.save<OGM_TYPES.EnumType>(enumType)
  }

  isReactNodeType(type: string) {
    return this.reactNodeTypeRegex.test(type)
  }
}
