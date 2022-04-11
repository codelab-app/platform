import { IRenderPropsType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { RenderPropsTypeFragment, TypeFragment } from '../../graphql'
import { UpdateTypeSchema } from '../../use-cases/types'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  owner,
}: RenderPropsTypeFragment): RenderPropsType =>
  new RenderPropsType({
    id,
    typeKind,
    name,
    ownerAuth0Id: owner?.auth0Id,
  })

@model('codelab/RenderPropsType')
export class RenderPropsType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.RenderPropsType),
    props: {},
  }))
  implements IRenderPropsType
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
