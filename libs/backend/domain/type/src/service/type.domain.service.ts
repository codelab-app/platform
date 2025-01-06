import { IInterfaceTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

import { InterfaceTypeRepository } from '../repository'

@Injectable()
export class TypeDomainService {
  constructor(private interfaceTypeRepository: InterfaceTypeRepository) {}

  async createInterface(
    dto: Omit<IInterfaceTypeDto, '__typename' | 'fields' | 'kind'>,
  ) {
    return await this.interfaceTypeRepository.add({
      ...dto,
      __typename: ITypeKind.InterfaceType,
      fields: [],
      kind: ITypeKind.InterfaceType,
    })
  }
}
