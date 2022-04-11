import { IReactNodeType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { ReactNodeTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/ReactNodeType')
export class ReactNodeType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.ReactNodeType),
    props: {},
  }))
  implements IReactNodeType
{
  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)
  }

  public static fromFragment({
    id,
    typeKind,
    name,
  }: ReactNodeTypeFragment): ReactNodeType {
    return new ReactNodeType({ id, typeKind, name })
  }
}
