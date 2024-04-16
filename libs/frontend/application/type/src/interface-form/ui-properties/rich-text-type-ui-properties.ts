import type { IRichTextTypeModel } from '@codelab/frontend/abstract/domain'
import { SelectApp } from '../fields'
import type { UiPropertiesFn } from '../types'

export const richTextTypeUiProperties: UiPropertiesFn<
  IRichTextTypeModel
> = () => {
  return { uniforms: { component: SelectApp } }
}
