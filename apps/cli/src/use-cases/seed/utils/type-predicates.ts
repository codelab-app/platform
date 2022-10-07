import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'

const findArrowFnReturnReactNode = /^\(.+\).+=>.+ReactNode$/
const findES5FnReturnReactNode = /^function(.+): ReactNode$/

export const findUnionType = /(function|=>|<|[?.;]|[[]])/

export const findPrimitiveType = /(boolean|number|string|integer)/

export const isInterfaceTypeRegex = /^\{.+.}$/

export const isHasAngleBracket = /{/

export const isReactNodeTypeRegex = /^ReactNode$/

const renderPropsRegexes = [
  findArrowFnReturnReactNode,
  findES5FnReturnReactNode,
]

interface UnionTypeArgs {
  field: AntdDesignField
  atom: IAtomImport
  userId: string
  values: Array<string>
}

export type FieldTypeRef = (args: UnionTypeArgs) => Promise<TypeRef>

export type IsTypePredicate<Keys extends keyof AntdDesignField = 'type'> = (
  apiField: Pick<AntdDesignField, Keys>,
) => boolean

// ReactNode is also render props
export const isRenderPropType: IsTypePredicate = (field) => {
  return renderPropsRegexes.some((regex) => regex.test(field.type))
}

export const isPrimitivePredicate: IsTypePredicate = (field) =>
  findPrimitiveType.test(field.type)

export const isEnumType: IsTypePredicate<'isEnum'> = (field) => field.isEnum

export const isUnionType: IsTypePredicate<'type' | 'isEnum'> = (field) =>
  field.type.includes('|') && !field.isEnum

export const isReactNodeType: IsTypePredicate = (field) =>
  isReactNodeTypeRegex.test(field.type)
