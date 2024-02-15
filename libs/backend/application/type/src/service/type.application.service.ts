import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeApplicationService {
  constructor(private interfaceTypeRepository: InterfaceTypeRepository) {}

  async getApiByAtomName(name: IAtomType) {
    const api = await this.interfaceTypeRepository.findOne({
      name: InterfaceType.createName(name),
    })

    return api
  }

  // async getFieldsByAtomName(name: IAtomType) {}
}
