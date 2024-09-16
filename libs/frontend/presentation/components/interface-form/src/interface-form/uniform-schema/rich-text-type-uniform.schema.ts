import type { IRichTextTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'
import { RichTextField } from '@codelab/frontend-presentation-components-form'

export const richTextTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IRichTextTypeModel
> = () => {
  return { uniforms: { component: RichTextField } }
}
