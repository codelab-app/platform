import type { IElementRenderTypeDto } from '@codelab/shared-abstract-core'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { IAtomType } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'

import { AtomRepository } from '../repository'

@Injectable()
export class AtomDomainService {
  constructor(
    private atomRepository: AtomRepository,
    private logger: PinoLoggerService,
  ) {}

  async defaultRenderType(): Promise<IElementRenderTypeDto> {
    const result = await this.atomRepository.findOneOrFail({
      where: {
        type: IAtomType.ReactFragment,
      },
    })

    return result
  }

  async getRenderTypeByName(name: IAtomType) {
    return await this.atomRepository.findOneOrFail({
      where: {
        name,
      },
    })
  }
}
