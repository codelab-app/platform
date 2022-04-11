import { IReactNodeType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { ReactNodeTypeFragment, TypeFragment } from '../../graphql'
import { UpdateTypeSchema } from '../../use-cases/types'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  owner,
}: ReactNodeTypeFragment): ReactNodeType =>
  new ReactNodeType({
    id,
    typeKind,
    name,
    ownerAuth0Id: owner?.auth0Id,
  })

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

  @modelAction
  override applyUpdateData(input: UpdateTypeSchema) {
    super.applyUpdateData(input)
  }

  public static fromFragment = fromFragment
}
