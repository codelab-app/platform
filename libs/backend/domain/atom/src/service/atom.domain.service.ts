import type { IElementRenderTypeDto } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { throwIfUndefined } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { AtomRepository } from '../repository'

@Injectable()
export class AtomDomainService {
  constructor(private atomRepository: AtomRepository) {}

  async defaultRenderType(): Promise<IElementRenderTypeDto> {
    return await this.atomRepository.findOneOrFail({
      where: {
        type: IAtomType.ReactFragment,
      },
    })
  }

  async getRenderTypeByName(name: IAtomType) {
    return await this.atomRepository.findOneOrFail({
      where: {
        name,
      },
    })
  }
}
