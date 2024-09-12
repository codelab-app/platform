import type { IAntDesignField } from '@codelab/backend/abstract/core'
import {
  Field,
  FieldRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { type IAtomDto, type IFieldDto } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { find } from 'remeda'
import { v4 } from 'uuid'
import { AntdTypeAdapterService } from '../../type-adapter/antd-type-adapter/antd-type-adapter.service'
import { readAntDesignApis } from './read-ant-design-apis'

export class ExtractAntDesignFieldsCommand {
  constructor(public atoms: Array<IAtomDto>) {}
}

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
@CommandHandler(ExtractAntDesignFieldsCommand)
export class ExtractAntDesignFieldsHandler
  implements ICommandHandler<ExtractAntDesignFieldsCommand, Array<IFieldDto>>
{
  constructor(
    private fieldRepository: FieldRepository,
    private typeFactory: TypeFactory,
    private antTypeAdapterService: AntdTypeAdapterService,
  ) {}

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  async execute({ atoms }: ExtractAntDesignFieldsCommand) {
    const antDesignApis = await readAntDesignApis(this.antdDataFolder)
    const fieldsByAtom = []

    for (const atom of atoms) {
      const antDesignApi = find(
        antDesignApis,
        (api) =>
          api.atom.name === atom.name.replace('AntDesign', '').toLowerCase(),
      )

      if (!antDesignApi) {
        continue
      }

      const fields = await this.transformFields(atom, antDesignApi.fields)

      fieldsByAtom.push(...fields)
    }

    return fieldsByAtom
  }

  private antdDataFolder = `${process.cwd()}/data/antd-v5/`

  private async createOrUpdateField(
    atom: IAtomDto,
    field: IAntDesignField,
  ): Promise<IFieldDto | undefined> {
    const existingField = await this.fieldRepository.findOne({
      where: {
        api: {
          id: atom.api.id,
        },
        key: field.property,
      },
    })

    if (existingField) {
      return existingField
    }

    const fieldTypeDto = await this.antTypeAdapterService.execute({
      atom,
      field: { key: field.property },
      type: field.type,
    })

    if (!fieldTypeDto) {
      return undefined
    }

    const type = await this.typeFactory.save(fieldTypeDto, {
      name: fieldTypeDto.name,
    })

    return Field.create({
      api: { id: atom.api.id },
      defaultValues: null,
      description: field.description,
      fieldType: type,
      id: v4(),
      key: field.property,
      name: compoundCaseToTitleCase(field.property),
    })
  }

  private async transformFields(
    atom: IAtomDto,
    atomFields: Array<IAntDesignField>,
  ) {
    const result: Array<IFieldDto> = []

    for (const field of atomFields) {
      const existingOrNewField = await this.createOrUpdateField(atom, field)

      if (existingOrNewField) {
        result.push(existingOrNewField)
      }
    }

    return result
  }
}
