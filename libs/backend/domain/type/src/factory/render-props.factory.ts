import type {
  ICreateRenderPropsType,
  IRenderPropsType,
} from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { RenderPropsType } from '../model/render-props-type.model'
import { RenderPropsTypeRepository } from '../repository/render-props-type.repo'

export class RenderPropsTypeFactory extends ITypeFactory<
  ICreateRenderPropsType,
  IRenderPropsType
> {
  repository: RenderPropsTypeRepository = new RenderPropsTypeRepository()

  async _create(
    { owner, id }: ICreateRenderPropsType,
    where: BaseTypeUniqueWhereCallback<IRenderPropsType>,
  ) {
    const renderPropsType = RenderPropsType.init({
      __typename: ITypeKind.RenderPropsType,
      id,
      owner,
    })

    return await this.repository.save(renderPropsType, where(renderPropsType))
  }
}
