import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import { logTask } from '../../shared/utils/log-task'
import { getEnumTypeForApi } from './types/enum-type-map'
import { getPrimitiveTypeForApi } from './types/primitive-type-map'
import { getReactNodeTypeForApi } from './types/react-node-type-map'
import { getRenderPropTypeForApi } from './types/render-prop-type'
import { getUnionTypeForApi } from './types/union/union-type-map'
import {
  isEnumType,
  isPrimitivePredicate,
  isReactNodeType,
  isRenderPropType,
  isUnionType,
} from './utils/type-predicates'

/**
 * Return existing type ref, or return create data for enums
 */

export const getTypeForApi = async (
  field: AntdDesignField,
  atom: IAtomImport,
  userId: string,
): Promise<TypeRef> => {
  logTask('Get Type For API', atom.name, field)

  const values = field.type.split('|').map((value) => value.trim())
  const args = { field, atom, userId, values }

  if (isEnumType(field)) {
    return await getEnumTypeForApi(args)
  }

  if (isReactNodeType(field)) {
    return await getReactNodeTypeForApi(args)
  }

  if (isRenderPropType(field)) {
    return await getRenderPropTypeForApi(args)
  }

  if (isUnionType(field)) {
    return await getUnionTypeForApi(args)
  }

  if (isPrimitivePredicate(field)) {
    return await getPrimitiveTypeForApi(args)
  }

  console.log(`Could not transform fields for Atom [${atom.type}]`, field)

  return null
}
