import type {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import { logTask } from '../../shared/utils/log-task'
import { getActionTypeForApi } from './types/action-type-map'
import { getEnumTypeForApi } from './types/enum-type-map'
import { getInterfaceTypeForApi } from './types/interface-type-map'
import { getPrimitiveTypeForApi } from './types/primitive-type-map'
import { getReactNodeTypeForApi } from './types/react-node-type-map'
import { getRenderPropTypeForApi } from './types/render-prop-type'
import { getUnionTypeForApi } from './types/union/union-type-map'
import {
  isActionType,
  isEnumType,
  isInterfaceType,
  isPrimitiveType,
  isReactNodeType,
  isRenderPropType,
  isUnionType,
} from './utils/type-predicates'
/**
 * Return existing type ref, or return create data for enums
 */

export const getTypeForApi = async (
  field: Pick<AntdDesignField, 'type' | 'property'>,
  atom: IAtomImport,
  userId: string,
): Promise<TypeRef> => {
  logTask('Get Type For API', atom.name, field)

  if (isEnumType(field.type)) {
    return await getEnumTypeForApi({ field, atom, userId })
  }

  if (isReactNodeType(field.type)) {
    return await getReactNodeTypeForApi({ field, atom, userId })
  }

  if (isRenderPropType(field.type)) {
    return await getRenderPropTypeForApi({ field, atom, userId })
  }

  if (isUnionType(field.type)) {
    return await getUnionTypeForApi({ field, atom, userId })
  }

  if (isPrimitiveType(field.type)) {
    return await getPrimitiveTypeForApi({ field, atom, userId })
  }

  if (isActionType(field.type)) {
    return await getActionTypeForApi({ field, atom, userId })
  }

  if (isInterfaceType(field.type)) {
    return await getInterfaceTypeForApi({ field, atom, userId })
  }

  console.log(`Could not transform fields for Atom [${atom.type}]`, field)

  return null
}
