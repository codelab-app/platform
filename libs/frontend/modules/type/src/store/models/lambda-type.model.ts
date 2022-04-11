import { ILambdaType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { LambdaTypeFragment, TypeFragment } from '../../graphql'
import { UpdateTypeSchema } from '../../use-cases/types'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  owner,
}: LambdaTypeFragment): LambdaType =>
  new LambdaType({
    id,
    typeKind,
    name,
    ownerAuth0Id: owner?.auth0Id,
  })

@model('codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.LambdaType),
    props: {},
  }))
  implements ILambdaType
{
  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)
  }

  @modelAction
  override applyUpdateData(input: UpdateTypeSchema) {
    super.applyUpdateData(input)
  }

  public static fromFragment = fromFragment
}
