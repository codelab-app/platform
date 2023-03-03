import type { ICodeMirrorType } from '@codelab/frontend/abstract/core'
import { ICodeMirrorTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import type { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'

const hydrate = ({
  id,
  kind,
  name,
  language,
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
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.CodeMirrorType) {
      throw new Error('Invalid CodeMirrorType')
    }

    this.language = fragment.language

    return this
  }

  @modelAction
  writeCache(codeMirrorTypeDTO: ICodeMirrorTypeDTO) {
    updateBaseTypeCache(this, codeMirrorTypeDTO)

    return this
  }

  public static hydrate = hydrate
}
