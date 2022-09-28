import { IAtomExport } from '@codelab/shared/abstract/core'
import { logTask } from '../../shared/utils/log-task'
import { AntdDesignApi } from './data/ant-design.data'
import { getEnumTypeForApi } from './types/enum-type-map'
import { getPrimitiveTypeForApi } from './types/primitive-type-map'
import { getReactNodeTypeForApi } from './types/react-node-type-map'
import { getRenderPropTypeForApi } from './types/render-prop-type'
import { getUnionTypeForApi } from './types/union-type-map'
import {
  findUnionType,
  isReactNodeTypeRegex,
  isRenderPropType,
} from './utils/isRenderPropType'

type TypeRef = {
  existingId: string
} | null

/**
 * Return existing type ref, or return create data for enums
 */

export const getTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomExport,
  userId: string,
): Promise<TypeRef> => {
  logTask('Get Type For API', atom.name, apiField)

  const values = apiField.type.split('|').map((value: string) => value.trim())
  const isBaseCondition = apiField.type.includes('|')
  const isComplexUnion = isBaseCondition && apiField.type.includes('{')

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
  if (isComplexUnion && !findUnionType.test(apiField.type)) {
    return await getUnionTypeForApi(apiField, atom, userId, values)
  }

  return await getPrimitiveTypeForApi(apiField, atom, userId, values)
}
