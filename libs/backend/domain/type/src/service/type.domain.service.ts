import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  IApiImport,
  IAtomImport,
  IInterfaceTypeDto,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

import { TypeFactory } from '../factory'
import { FieldRepository, InterfaceTypeRepository } from '../repository'

@Injectable()
export class TypeDomainService {
  constructor(
    private interfaceTypeRepository: InterfaceTypeRepository,
    private readonly logger: PinoLoggerService,
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async addManyApis(apis: Array<IApiImport>) {
    const allTypes = apis.flatMap(({ types }) => types)
    const apiFields = apis.flatMap(({ fields }) => fields)

    /**
     * Add interface type first, then we assign fields
     */
    this.logger.log('Adding interface types', {
      context: 'TypeDomainService',
      count: apis.length,
    })

    await this.interfaceTypeRepository.addMany(apis)

    for (const type of allTypes) {
      await this.typeFactory.add(type)
    }

    this.logger.log('Adding interface fields', {
      context: 'TypeDomainService',
      count: apiFields.length,
    })

    await this.fieldRepository.addMany(apiFields)
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
    const found = await this.interfaceTypeRepository.findOne({
      where: { id: interfaceType.id },
    })

    return interfaceType
  }
}
