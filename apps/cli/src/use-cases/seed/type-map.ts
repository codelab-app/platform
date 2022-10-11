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
import { parseAntDesignTypeValues } from './utils/parser'
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
  const args = { field, atom, userId, values: parseAntDesignTypeValues(field) }
  logTask('Get Type For API', atom.name, args)

  if (isEnumType(args.values)) {
    return await getEnumTypeForApi(args)
  }

  if (isReactNodeType(args.values)) {
    return await getReactNodeTypeForApi(args)
  }

  if (isRenderPropType(args.values)) {
    return await getRenderPropTypeForApi(args)
  }

  if (isUnionType(args.values)) {
    return await getUnionTypeForApi(args)
  }

  if (isPrimitivePredicate(args.values)) {
    return await getPrimitiveTypeForApi(args)
  }

  console.log(`Could not transform fields for Atom [${atom.type}]`, field)

  return null
}
