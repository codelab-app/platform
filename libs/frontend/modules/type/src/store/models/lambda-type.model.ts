import {
  assertIsTypeKind,
  ILambdaType,
  ILambdaTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: ILambdaTypeDTO): LambdaType => {
  assertIsTypeKind(kind, ITypeKind.LambdaType)

  return new LambdaType({
    id,
    kind,
    name,
    ownerId: owner?.id,
  })
}

@model('@codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(ITypeKind.LambdaType),
    props: {},
  }))
  implements ILambdaType
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
