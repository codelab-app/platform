import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ReadAdminDataService } from '@codelab/backend/application/shared'
import { AdminRepository } from '@codelab/backend/domain/admin'
import { SeederDomainService } from '@codelab/backend/domain/shared/seeder'
import { ExportDto, IAtomType, ImportDto } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAdminDataCommand } from './use-case/export/export-admin-data.command.service'
import { ImportAdminDataCommand } from './use-case/import/import-admin-data.command.service'

export class ResetDataDto {
  close?: false
}

@Controller('admin')
export class AdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly adminRepository: AdminRepository,
    private seederService: SeederDomainService,
    // private seedCypressDataService: SeedCypressDataService,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  @Post('export')
  async export(@Body() exportDto: ExportDto) {
    const { adminDataPath } = exportDto

    await this.commandBus.execute(new ExportAdminDataCommand(adminDataPath))

    // if (includeUserData) {
    //   const userData = await this.commandBus.execute(
    //     new ExportUserDataCommand(user),
    //   )

    //   await saveFormattedFile(`${user.auth0Id}-${Date.now()}.json`, userData)
    // }
  }

  @Post('import')
  async import(@Body() { adminDataPath }: ImportDto) {
    await this.commandBus.execute(new ImportAdminDataCommand(adminDataPath))
    // if (includeUserData) {
    //   const json = fs.readFileSync(file.path, 'utf8')
    //   const userData = JSON.parse(json)
    //   console.log('import user data')
    //   // await importUserData(userData, { auth0Id: selectedAuth0Id });
    // }
  }

  @Post('reset-database')
  async resetDatabase() {
    await this.adminRepository.resetDatabase()

    return {
      message: 'Admin data reset success',
    }
  }

  @Post('reset-database-except-user')
  async resetDatabaseExceptUser() {
    await this.adminRepository.resetDatabaseExceptUser()

    return {
      message: 'Admin data reset success',
    }
  }

  /**
   * We want to keep the default atom
   */
  @Post('reset-database-except-user-and-atom')
  async resetDatabaseExceptUserAndAtom() {
    await this.adminRepository.resetDatabaseExceptUserAndAtom()

    return {
      message: 'Admin data reset success',
    }
  }

  /**
   * For dev we don't clear any data
   */
  @Post('setup-dev')
  async setup() {
    await this.seederService.seedUserFromRequest()

    const atoms = this.readAdminDataService.atoms.filter(
      ({ atom }) => atom.type === IAtomType.ReactFragment,
    )

    for (const atom of atoms) {
      await this.commandBus.execute<ImportAtomCommand>(
        new ImportAtomCommand(atom),
      )
    }
  }

  @Post('setup-e2e')
  async setupE2e() {
    await this.adminRepository.resetDatabase()

    await this.seederService.seedUserFromRequest()
  }
}
