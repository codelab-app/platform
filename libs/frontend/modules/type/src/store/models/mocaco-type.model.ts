import { MonacoLanguage } from '@codelab/shared/abstract/codegen-v2'
import { IMonacoType, TypeKind } from '@codelab/shared/abstract/core'
import {
  ExtendedModel,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { MonacoTypeFragment, TypeFragment } from '../../graphql'
import { baseTypeProps, baseUpdateFromFragment, IBaseType } from '../abstract'
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
