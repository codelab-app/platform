import type {
  ICreateTypeDto,
  IInterfaceTypeDTO,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { InterfaceTypeRepository } from '../repository'

@Injectable()
export class TypeDomainService {
  constructor(private interfaceTypeRepository: InterfaceTypeRepository) {}

  async createInterface(dto: IInterfaceTypeDTO) {
    return await this.interfaceTypeRepository.add([dto])
  }
}
