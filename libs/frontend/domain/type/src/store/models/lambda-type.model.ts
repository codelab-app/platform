import type { ILambdaType } from '@codelab/frontend/abstract/core'
import { ILambdaTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: ILambdaTypeDTO): LambdaType => {
  assertIsTypeKind(kind, ITypeKind.LambdaType)

  return new LambdaType({
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(createBaseType(ITypeKind.LambdaType), {})
  implements ILambdaType
{
  @modelAction
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    return this
  }

  @modelAction
  writeCache(lambdaTypeDTO: ILambdaTypeDTO) {
    updateBaseTypeCache(this, lambdaTypeDTO)

    return this
  }

  public static hydrate = hydrate
}
