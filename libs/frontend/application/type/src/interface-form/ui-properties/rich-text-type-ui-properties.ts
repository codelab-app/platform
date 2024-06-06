import type { IRichTextTypeModel } from '@codelab/frontend/abstract/domain'
import type { UiPropertiesFn } from '../types'
import { RichTextField } from '@codelab/frontend-presentation-view/components/form'

export const richTextTypeUiProperties: UiPropertiesFn<
  IRichTextTypeModel
> = () => {
  return { uniforms: { component: RichTextField } }
}
