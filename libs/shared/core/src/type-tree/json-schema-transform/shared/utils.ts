import { IType } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { TransformTypeOptions } from './types'

export const getExtraProperties = (
  type: IType,
  options: Nullish<TransformTypeOptions>,
) => options?.extraProperties?.(type) || undefined
