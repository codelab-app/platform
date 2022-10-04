import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { logTask } from '../../shared/utils/log-task'
import { getEnumTypeForApi } from './types/enum-type-map'
import { getPrimitiveTypeForApi } from './types/primitive-type-map'
import { getReactNodeTypeForApi } from './types/react-node-type-map'
import { getRenderPropTypeForApi } from './types/render-prop-type'
import { getUnionTypeForApi } from './types/union-type-map'
import {
  findPrimitiveType,
  isReactNodeTypeRegex,
  isRenderPropType,
} from './utils/isRenderPropType'

/**
 * Return existing type ref, or return create data for enums
 */

export const getTypeForApi = async (
  apiField: AntdDesignField,
  atom: IAtomImport,
  userId: string,
): Promise<TypeRef> => {
  logTask('Get Type For API', atom.name, apiField)

  const values = apiField.type.split('|').map((value: string) => value.trim())
  const isUnionType = apiField.type.includes('|')

  // Check if type is Enum Type
  if (apiField.isEnum) {
    return await getEnumTypeForApi(apiField, atom, userId, values)
  }

  // Check if type is React Node Type
  if (isReactNodeTypeRegex.test(apiField.type)) {
    return await getReactNodeTypeForApi()
  }

  // Check if type is Render Prop Type
  if (isRenderPropType(apiField.type)) {
    return await getRenderPropTypeForApi()
  }

  // Check if type is Complex Union Type
  if (isUnionType && !apiField.isEnum) {
    return await getUnionTypeForApi(apiField, atom, userId, values)
  }

  if (findPrimitiveType.test(apiField.type)) {
    return await getPrimitiveTypeForApi(apiField, atom)
  } else {
    console.log(`Could not transform fields for Atom [${atom.type}]`, apiField)

    return null
  }
}
