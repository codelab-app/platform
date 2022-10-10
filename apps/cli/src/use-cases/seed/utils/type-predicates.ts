import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import {
  containsInterfaceTypeRegex,
  isPrimitiveTypesRegex,
  reactNodeTypeRegex,
  renderPropsRegexes,
  skippedTypeRegex,
} from './matchers'

interface UnionTypeArgs {
  field: AntdDesignField
  atom: IAtomImport
  userId: string
  // These are the split values after processing field.types
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
  isPrimitiveTypesRegex.test(field.type)

export const isEnumType: IsTypePredicate<'isEnum'> = (field) => field.isEnum

export const isUnionType: IsTypePredicate<'type' | 'isEnum'> = (field) =>
  field.type.includes('|') &&
  !field.isEnum &&
  !skippedTypeRegex.test(field.type)

/**
 * See if `boolean | { loading: true }` contains a nested interface
 */
export const containsInterfaceType: IsTypePredicate = (field) =>
  containsInterfaceTypeRegex.test(field.type) &&
  // We don't want to parse edge cases yet
  !skippedTypeRegex.test(field.type)

export const isReactNodeType: IsTypePredicate = (field) =>
  reactNodeTypeRegex.test(field.type)
