import type {
  IAtomDto,
  IFieldDto,
  IRef,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import type {
  ActionTypeFragment,
  CodeMirrorTypeFragment,
  EnumTypeFragment,
  PrimitiveTypeFragment,
  ReactNodeTypeFragment,
  RenderPropTypeFragment,
  RichTextTypeFragment,
  UnionTypeFragment,
} from '@codelab/shared/infra/gql'

/**
 * Allows transformation of any framework types to the core types
 */
export interface ITypeTransformer {
  actionType(type: string): Promise<ActionTypeFragment>
  booleanType(type: string): Promise<PrimitiveTypeFragment>
  codeMirrorType(type: string): Promise<CodeMirrorTypeFragment>
  enumType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ): Promise<EnumTypeFragment>
  integerType(type: string): Promise<PrimitiveTypeFragment>
  numberType(type: string): Promise<PrimitiveTypeFragment>
  reactNodeType(type: string): Promise<ReactNodeTypeFragment>
  renderPropType(type: string): Promise<RenderPropTypeFragment>
  richTextType(type: string): Promise<RichTextTypeFragment>
  stringType(type: string): Promise<PrimitiveTypeFragment>
  unionType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ): Promise<IUnionTypeDto>
}
