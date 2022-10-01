import type {
  ICodeMirrorType,
  ICodeMirrorTypeDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/frontend/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

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
    name,
    language,
    ownerId: owner?.id,
  })
}

@model('@codelab/CodeMirrorType')
export class CodeMirrorType
  extends ExtendedModel(createTypeBase(ITypeKind.CodeMirrorType), {
    language: prop<CodeMirrorLanguage>(),
  })
  implements ICodeMirrorType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.CodeMirrorType) {
      throw new Error('Invalid CodeMirrorType')
    }

    this.language = fragment.language

    return this
  }

  public static hydrate = hydrate
}
