import { IEnumType } from '@codelab/shared/abstract/core'
import { TypeTransformFn } from '../shared/types'
import { getExtraProperties } from '../shared/utils'

export const transformEnumType: TypeTransformFn<IEnumType> = (
  type,
  options,
) => {
  const extra = getExtraProperties(type, options)

  const uniforms = {
    options: type.allowedValues.map((v) => ({
      value: v.id,
      label: v.name,
    })),
    ...extra?.uniforms,
  }

  return {
    type: 'string',
    enum: type.allowedValues.map((v) => v.id),
    uniforms,
    ...extra,
  }
}
