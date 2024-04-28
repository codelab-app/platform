import type {
  ActionType,
  CodeMirrorType,
  EnumType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  RichTextType,
  UnionType,
} from '@codelab/backend/abstract/codegen'
import type { IAtomDto, IFieldDto } from '@codelab/shared/abstract/core'

/**
 * Allows transformation of any framework types to the core types
 */
export interface ITypeTransformer {
  actionType(type: string): Promise<ActionType>
  booleanType(type: string): Promise<PrimitiveType>
  codeMirrorType(type: string): Promise<CodeMirrorType>
  enumType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ): Promise<EnumType>
  integerType(type: string): Promise<PrimitiveType>
  numberType(type: string): Promise<PrimitiveType>
  reactNodeType(type: string): Promise<ReactNodeType>
  renderPropType(type: string): Promise<RenderPropType>
  richTextType(type: string): Promise<RichTextType>
  stringType(type: string): Promise<PrimitiveType>
  unionType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ): Promise<UnionType>
}
