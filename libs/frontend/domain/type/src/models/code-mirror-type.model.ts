import type { ICodeMirrorTypeModel } from '@codelab/frontend/abstract/domain'
import type { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { ICodeMirrorTypeDTO } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({
  id,
  kind,
  language,
  name,
}: ICodeMirrorTypeDTO): CodeMirrorType => {
  assertIsTypeKind(kind, ITypeKind.CodeMirrorType)

  return new CodeMirrorType({
    id,
    kind,
    language,
    name,
  })
}

@model('@codelab/CodeMirrorType')
export class CodeMirrorType
  extends ExtendedModel(createBaseType(ITypeKind.CodeMirrorType), {
    language: prop<CodeMirrorLanguage>(),
  })
  implements ICodeMirrorTypeModel
{
  public static create = create

  @modelAction
  writeCache(codeMirrorTypeDTO: Partial<ICodeMirrorTypeDTO>) {
    super.writeCache(codeMirrorTypeDTO)

    this.language = codeMirrorTypeDTO.language ?? this.language

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      language: this.language,
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      update: {
        language: this.language,
      },
    })
  }
}
