import type { ICodeMirrorTypeDto } from '@codelab/shared-abstract-core'
import type { CodeMirrorLanguage } from '@codelab/shared-infra-gqlgen'

import {
  type ICodeMirrorTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

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

  get toJson() {
    return {
      __typename: this.__typename,
      id: this.id,
      kind: this.kind,
      language: this.language,
      name: this.name,
      owner: this.owner.current.toJson,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }

  @modelAction
  writeCache(codeMirrorTypeDto: Partial<ICodeMirrorTypeDto>) {
    super.writeCache(codeMirrorTypeDto)

    this.language = codeMirrorTypeDto.language ?? this.language

    return this
  }
}
