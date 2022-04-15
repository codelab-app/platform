import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import {
  IMonacoType,
  IMonacoTypeDTO,
  ITypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  typeKind,
  name,
  language,
  owner,
}: IMonacoTypeDTO): MonacoType =>
  new MonacoType({
    id,
    typeKind,
    name,
    language,
    ownerId: owner?.id,
  })

@model('@codelab/MonacoType')
export class MonacoType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.MonacoType),
    props: {
      language: prop<MonacoLanguage>(),
    },
  }))
  implements IMonacoType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)

    if (fragment.typeKind !== TypeKind.MonacoType) {
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
