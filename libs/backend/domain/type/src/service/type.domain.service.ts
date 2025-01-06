import { IInterfaceTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

import { InterfaceTypeRepository } from '../repository'

@Injectable()
export class TypeDomainService {
  constructor(private interfaceTypeRepository: InterfaceTypeRepository) {}

  async createInterface(
    dto: Omit<IInterfaceTypeDto, '__typename' | 'fields' | 'kind'>,
  ) {
    const interfaceType = await this.interfaceTypeRepository.add({
      ...dto,
      __typename: ITypeKind.InterfaceType,
      fields: [],
      kind: ITypeKind.InterfaceType,
    })

    console.log('interfaceType', interfaceType)

    // Find and return the created interface type
    const found = await this.interfaceTypeRepository.findOne({
      where: { id: interfaceType.id },
    })

    console.log('found', found)

    return interfaceType
  }
}
