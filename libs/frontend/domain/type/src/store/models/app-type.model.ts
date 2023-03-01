import type { IAppType } from '@codelab/frontend/abstract/core'
import { IAppTypeDTO } from '@codelab/frontend/abstract/core';
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
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
  @modelAction
  writeCache(appTypeDTO: IAppTypeDTO) {
    updateBaseTypeCache(this, appTypeDTO)

    return this
  }

  public static hydrate = hydrate
}
