import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import {
  containsInterfaceTypeRegex,
  functionTypeRegex,
  isPrimitiveTypesRegex,
  reactNodeTypeRegex,
  renderPropsRegexes,
} from './matchers'

interface UnionTypeArgs {
  field: AntdDesignField
  atom: IAtomImport
  userId: string
  // These are the split values after processing field.types
  values: Array<string>
}

export type FieldTypeRef = (args: UnionTypeArgs) => Promise<TypeRef>

/**
 * We must check on parsed values as opposed to field.type
 *
 * We reduce each predicate by multiplying all elements in an array
 */
export type IsTypePredicates = (values: UnionTypeArgs['values']) => boolean

export const isPrimitivePredicate: IsTypePredicates = (values) => {
  if (values.length !== 1) {
    return false
  }

  return isPrimitiveTypesRegex.test(values[0] ?? '')
}

/**
 * Some enum fields in Ant Design docs don't have CODE block, but uses `'` instead, so we can't rely on `isEnum` anymore
 *
 * Input.status = 'error' | 'warning'
 *
 * @param field
 */
export const isEnumType: IsTypePredicates = (values) => {
  console.log(values)

  // Enum type must have more than 1 item
  if (values.length <= 1) {
    return false
  }

  return values.reduce((passes, value) => {
    return !functionTypeRegex.test(value) && passes
  }, true)
}

export const isUnionType: IsTypePredicates = (values) => {
  // Union type must have more than 1 item
  if (values.length <= 1) {
    return false
  }

  return values.reduce((passes, value) => {
    return !functionTypeRegex.test(value) && passes
  }, true)
}

export const isReactNodeType: IsTypePredicates = (values) => {
  if (values.length !== 1) {
    return false
  }

  return reactNodeTypeRegex.test(values[0] ?? '')
}

// ReactNode is also render props
export const isRenderPropType: IsTypePredicates = (values) => {
  if (values.length !== 1) {
    return false
  }

  return renderPropsRegexes.some((regex) => regex.test(values[0] ?? ''))
}

/**
 * See if `boolean | { loading: true }` contains a nested interface
 */
export const unionContainsInterfaceType: IsTypePredicates = (values) => {
  if (values.length <= 1) {
    return false
  }

  return values.reduce((passes, value) => {
    // We use `||` since we only need 1 to have a nested interface
    return (
      containsInterfaceTypeRegex.test(value) ||
      // We don't want to parse edge cases yet
      !functionTypeRegex.test(value) ||
      passes
    )
  }, true)
}
