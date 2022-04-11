import { IAppType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { AppTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/AppType')
export class AppType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.AppType),
    props: {},
  }))
  implements IAppType
{
  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)
  }

  public static fromFragment({ id, typeKind, name }: AppTypeFragment): AppType {
    return new AppType({ id, typeKind, name })
  }
}
