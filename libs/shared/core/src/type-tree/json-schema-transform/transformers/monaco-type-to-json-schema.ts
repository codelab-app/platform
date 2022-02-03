import { IMonacoType } from '@codelab/shared/abstract/core'
import { TypeTransformFn } from '../shared/types'
import { getExtraProperties } from '../shared/utils'

export const monacoTypeToJsonSchema: TypeTransformFn<IMonacoType> = (
  type,
  options,
) => {
  const extra = getExtraProperties(type, options)

  return { type: 'string', ...extra }
}
