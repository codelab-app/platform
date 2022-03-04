import { MonacoLanguage } from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { MonacoTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/MonacoType')
export class MonacoType
  extends Model({
    ...baseTypeProps(TypeKind.MonacoType),
    language: prop<MonacoLanguage>(),
  })
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

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
