import type {
  ICodeMirrorLanguage,
  ICodeMirrorTypeDto,
} from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'

import { BaseType } from './base-type.model'

export class CodeMirrorType extends BaseType implements ICodeMirrorTypeDto {
  __typename: `${ITypeKind.CodeMirrorType}` = ITypeKind.CodeMirrorType

  language: ICodeMirrorLanguage

  constructor({ id, language, name, owner }: ICodeMirrorTypeDto) {
    super({
      id,
      kind: ITypeKind.CodeMirrorType,
      name,
      owner,
    })

    this.language = language
  }
}
