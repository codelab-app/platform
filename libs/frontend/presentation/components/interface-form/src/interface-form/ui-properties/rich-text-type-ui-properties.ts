import type { IRichTextTypeModel } from '@codelab/frontend/abstract/domain'
import { RichTextField } from '@codelab/frontend-presentation-components-form'
import type { UiPropertiesFn } from '../types'

export const richTextTypeUiProperties: UiPropertiesFn<
  IRichTextTypeModel
> = () => {
  return { uniforms: { component: RichTextField } }
}
