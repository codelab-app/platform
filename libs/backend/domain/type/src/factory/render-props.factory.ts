import type {
  IRenderPropsType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { render } from 'react-dom'
import { RenderPropsType } from '../model/render-props-type.model'
import { RenderPropsTypeRepository } from '../repository/render-props-type.repo'

export class RenderPropsTypeFactory implements ITypeFactory<IRenderPropsType> {
  repository: RenderPropsTypeRepository = new RenderPropsTypeRepository()

  async create(data: IRenderPropsType, where?: BaseUniqueWhere) {
    const renderPropsType = new RenderPropsType(data)
    await this.repository.save(renderPropsType, where)

    return renderPropsType
  }
}
