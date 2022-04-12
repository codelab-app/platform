import {
  IAppType,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { AppTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  owner,
}: AppTypeFragment): AppType => {
  return new AppType({ id, typeKind, name, ownerAuth0Id: owner?.auth0Id })
}

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

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)
  }

  public static fromFragment = fromFragment
}
