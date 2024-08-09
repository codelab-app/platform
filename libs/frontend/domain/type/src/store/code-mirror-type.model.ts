import type { ICodeMirrorTypeModel } from '@codelab/frontend/abstract/domain'
import type { ICodeMirrorTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({
  id,
  kind,
  language,
  name,
}: ICodeMirrorTypeDto): CodeMirrorType => {
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
  writeCache(codeMirrorTypeDto: Partial<ICodeMirrorTypeDto>) {
    super.writeCache(codeMirrorTypeDto)

    this.language = codeMirrorTypeDto.language ?? this.language

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
