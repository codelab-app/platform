import {
  IInterfaceTypeDto,
  ITypeDto,
  ITypeKind,
} from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'

import { TypeFactory } from '../factory'
import { InterfaceTypeRepository } from '../repository'

@Injectable()
export class TypeDomainService {
  constructor(
    private interfaceTypeRepository: InterfaceTypeRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async addMany(types: Array<ITypeDto>) {
    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.add(type)
    }
  }

  async createInterface(
    dto: Omit<IInterfaceTypeDto, '__typename' | 'fields' | 'kind'>,
  ) {
    const interfaceType = await this.interfaceTypeRepository.add({
      ...dto,
      __typename: ITypeKind.InterfaceType,
      fields: [],
      kind: ITypeKind.InterfaceType,
    })

    // Find and return the created interface type
    // const found = await this.interfaceTypeRepository.findOne({
    //   where: { id: interfaceType.id },
    // })

    return interfaceType
  }

  async saveMany(types: Array<ITypeDto>) {
    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.save(type)
    }
  }
}
