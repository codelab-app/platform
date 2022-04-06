import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { IMonacoType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { MonacoTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/MonacoType')
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
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.MonacoType) {
      return
    }

    this.language = fragment.language
  }

  public static fromFragment({
    id,
    typeKind,
    name,
    language,
  }: MonacoTypeFragment): MonacoType {
    return new MonacoType({ id, typeKind, name, language })
  }
}
