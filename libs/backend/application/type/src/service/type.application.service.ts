import { ReadAdminDataService } from '@codelab/backend/application/data'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  FieldRepository,
  InterfaceType,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { LogClassMethod } from '@codelab/backend/infra/core'
import {
  type IApiAggregate,
  type IAtomType,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeApplicationService {
  constructor(
    private interfaceTypeRepository: InterfaceTypeRepository,
    private readonly logger: PinoLoggerService,
    private readonly fieldRepository: FieldRepository,
    private authDomainService: AuthDomainService,
    private readonly typeFactory: TypeFactory,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  @LogClassMethod()
  async addApis(apis: Array<IApiAggregate>) {
    const allTypes = apis.flatMap(({ types }) => types)
    const apiFields = apis.flatMap(({ fields }) => fields)

    /**
     * Add interface type first, then we assign fields
     */
    this.logger.log('Adding interface types', {
      apiCount: apis.length,
      context: 'TypeApplicationService',
      fieldCount: apiFields.length,
      typesCount: allTypes.length,
    })

    // System types are already imported, they are contained in json file only because they are considered dependentTypes
    const typesToImport = allTypes.filter((type) => {
      const isSystemType = this.readAdminDataService.systemTypes.some(
        ({ id }) => id === type.id,
      )

      return !isSystemType
    })

    console.log('typesToImport', typesToImport)

    for (const type of typesToImport) {
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
