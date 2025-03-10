import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  IApiImport,
  IAtomImport,
  IInterfaceTypeDto,
  ITypeDto,
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

  async addMany(types: Array<ITypeDto>) {
    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.add(type)
    }
  }

  async addManyApis(apis: Array<IApiImport>) {
    // Log details for each API
    // for (const api of apis) {
    //   const fieldNames = api.fields.map((field) => field.key)

    //   this.logger.log(`API: ${api.name}`, {
    //     context: 'TypeDomainService',
    //     fieldCount: api.fields.length,
    //     fieldNames,
    //   })
    // }

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

  async saveMany(types: Array<ITypeDto>) {
    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.save(type)
    }
  }
}
