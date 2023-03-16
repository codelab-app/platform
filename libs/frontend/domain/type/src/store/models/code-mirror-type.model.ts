import type {
  ICodeMirrorType,
  ICodeMirrorTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({
  id,
  kind,
  language,
  name,
  owner,
}: ICodeMirrorTypeDTO): CodeMirrorType => {
  assertIsTypeKind(kind, ITypeKind.CodeMirrorType)

  return new CodeMirrorType({
    id,
    kind,
    language,
    name,
    owner,
  })
}

@model('@codelab/CodeMirrorType')
export class CodeMirrorType
  extends ExtendedModel(createBaseType(ITypeKind.CodeMirrorType), {
    language: prop<CodeMirrorLanguage>(),
  })
  implements ICodeMirrorType
{
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

  public static create = create
}
