import type { IApiAggregate, IAtomType } from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  FieldRepository,
  InterfaceType,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { LogClassMethod } from '@codelab/backend/infra/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeApplicationService {
  constructor(
    private interfaceTypeRepository: InterfaceTypeRepository,
    private readonly logger: PinoLoggerService,
    private readonly fieldRepository: FieldRepository,
    private authDomainService: AuthDomainService,
    private readonly typeFactory: TypeFactory,
  ) {}

  @LogClassMethod()
  async addApis(apis: Array<IApiAggregate>) {
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
      context: 'TypeApplicationService',
      count: apis.length,
    })

    // await this.interfaceTypeRepository.addMany(
    //   apis.map((api) => ({
    //     ...api,
    //     owner: this.authDomainService.currentUser,
    //   })),
    // )

    for (const type of allTypes) {
      await this.typeFactory.add({
        ...type,
        owner: this.authDomainService.currentUser,
      })
    }

    this.logger.log('Adding interface fields', {
      context: 'TypeApplicationService',
      count: apiFields.length,
    })

    await this.fieldRepository.addMany(apiFields)
  }

  @LogClassMethod()
  async getApiByAtomName(name: IAtomType) {
    const api = await this.interfaceTypeRepository.findOne({
      where: {
        name: InterfaceType.createName(name),
      },
    })

    return api
  }

  @LogClassMethod()
  async saveApi(api: IApiAggregate) {
    const { fields, types } = api

    for (const type of types) {
      await this.typeFactory.save({
        ...type,
        owner: this.authDomainService.currentUser,
      })
    }

    for (const field of fields) {
      await this.fieldRepository.save(field)
    }
  }
}
