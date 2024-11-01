import type { ICodeMirrorTypeDto } from '@codelab/shared/abstract/core'

import {
  type ICodeMirrorTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { mergeDeep } from 'remeda'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({
  id,
  kind,
  language,
  name,
  owner,
}: ICodeMirrorTypeDto): CodeMirrorType => {
  assertIsTypeKind(kind, ITypeKind.CodeMirrorType)

  return new CodeMirrorType({
    id,
    kind,
    language,
    name,
    owner: userRef(owner.id),
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

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }
}
