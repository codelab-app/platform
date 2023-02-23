import type { IAppType, IAppTypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IAppTypeDTO): AppType => {
  assertIsTypeKind(kind, ITypeKind.AppType)

  return new AppType({
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/AppType')
export class AppType
  extends ExtendedModel(createBaseType(ITypeKind.AppType), {})
  implements IAppType
{
  // @modelAction
  // writeCache(fragment: ITypeDTO) {
  //   updateBaseTypeCache(this, fragment)
  //
  //   return this
  // }

  public static hydrate = hydrate
}
