import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import {
  assertIsTypeKind,
  IMonacoType,
  IMonacoTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  kind,
  name,
  language,
  owner,
}: IMonacoTypeDTO): MonacoType => {
  assertIsTypeKind(kind, ITypeKind.MonacoType)

  return new MonacoType({
    id,
    kind,
    name,
    language,
    ownerId: owner?.id,
  })
}

@model('@codelab/MonacoType')
export class MonacoType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(ITypeKind.MonacoType),
    props: {
      language: prop<MonacoLanguage>(),
    },
  }))
  implements IMonacoType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.MonacoType) {
      return
    }

    this.language = fragment.language
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  //
  //   if (!input.language) {
  //     throw new Error('MonacoType must have a language')
  //   }
  //
  //   this.language = input.language
  // }

  public static hydrate = hydrate
}
