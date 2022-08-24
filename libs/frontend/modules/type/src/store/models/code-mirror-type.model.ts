import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type {
  ICodeMirrorType,
  ICodeMirrorTypeDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
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
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.CodeMirrorType) {
      return
    }

    this.language = fragment.language
  }

  public static hydrate = hydrate
}
