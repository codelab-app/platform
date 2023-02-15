import type {
  ICreateRenderPropsType,
  IRenderPropsType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { RenderPropsType } from '../model/render-props-type.model'
import { RenderPropsTypeRepository } from '../repository/render-props-type.repo'

export class RenderPropsTypeFactory
  implements ITypeFactory<ICreateRenderPropsType>
{
  repository: RenderPropsTypeRepository = new RenderPropsTypeRepository()

  async create(
    { owner }: ICreateRenderPropsType,
    where: BaseTypeUniqueWhereCallback<IRenderPropsType>,
  ) {
    const renderPropsType = RenderPropsType.init({
      __typename: ITypeKind.RenderPropsType,
      owner,
    })

    await this.repository.save(renderPropsType, where(renderPropsType))

    return renderPropsType
  }
}
