import type {
  IAppType,
  IAppTypeDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IAppTypeDTO): AppType => {
  assertIsTypeKind(kind, ITypeKind.AppType)

  return new AppType({ id, kind, name, ownerId: owner.id })
}

@model('@codelab/AppType')
export class AppType
  extends ExtendedModel(createTypeBase(ITypeKind.AppType), {})
  implements IAppType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  // }

  public static hydrate = hydrate
}
