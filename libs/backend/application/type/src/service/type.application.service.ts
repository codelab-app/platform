import { ReadAdminDataService } from '@codelab/backend-application-data'
import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import {
  FieldRepository,
  InterfaceType,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend-domain-type'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { LogClassMethod } from '@codelab/backend-infra-core'
import {
  type IApiAggregate,
  type IAtomType,
} from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'
import { uniqueBy } from 'remeda'

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

    // Shared types such as `AtomChildren Union` would appear multiple times, filter to dedup
    const dedupedTypes = uniqueBy(allTypes, (type) => type.id).filter(
      (type) =>
        !this.readAdminDataService.systemTypes.some(
          (_type) => _type.id === type.id,
        ),
    )

    for (const type of dedupedTypes) {
      this.logger.debug('Adding type', {
        type,
      })

      await this.typeFactory.add({
        ...type,
        owner: this.authDomainService.currentUser,
      })
    }

    await this.logger.debugWithTiming(
      'Adding interface fields',
      async () => {
        await this.fieldRepository.addMany(apiFields)
      },
      {
        context: 'service:type',
        data: {
          fieldCount: apiFields.length,
          fieldIds: apiFields.map((field) => field.id),
          fieldKeys: apiFields.map((field) => field.key),
        },
      },
    )
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

    // Log what we're actually saving
    this.logger.debug('saveApi called with:', {
      fieldsCount: fields.length,
      typeNames: types.map((type) => type.name),
      typesCount: types.length,
    })

    /**
     * Save types sequentially due to type dependencies
     * (e.g., ArrayType references element type, UnionType contains member types)
     * Parallel processing would cause errors when dependent types aren't created yet
     */
    for (const type of types) {
      await this.typeFactory.save({
        ...type,
        owner: this.authDomainService.currentUser,
      })
    }

    /**
     * Save fields sequentially to avoid Neo4j deadlocks and race conditions
     * Fields have bidirectional sibling relationships (prevSibling/nextSibling)
     * that cause conflicts when multiple fields update relationships to the same nodes
     * in parallel. Sequential processing ensures consistent relationship updates.
     */
    for (const field of fields) {
      await this.fieldRepository.save(field)
    }
  }
}
