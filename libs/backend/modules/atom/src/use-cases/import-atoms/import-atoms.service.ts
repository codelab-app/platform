import { UseCasePort } from '@codelab/backend/abstract/core'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { ImportApiService } from '@codelab/backend/modules/type'
import { AtomType, IUser } from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { CreateAtomService } from '../create-atom'
import { CreateAtomRequest } from '../create-atom/create-atom.request'
import { TestGetExport__AtomsFragment } from '../export-atoms/get-export-atoms.api.graphql.gen'
import { GetAtomService } from '../get-atom'
import { UpdateAtomService } from '../update-atom'
import { ImportAtomsRequest } from './import-atoms.request'

/**
 * This is the entry point to importing all atom related data.
 * This function will call a basic seeder to seed all default data that belongs to the platform.
 *
 * The calls are idempotent
 *
 */
@Injectable()
export class ImportAtomsService
  implements UseCasePort<ImportAtomsRequest, void>
{
  constructor(
    private getAtomService: GetAtomService,
    private createAtomService: CreateAtomService,
    private importApiService: ImportApiService,
    private updateAtomService: UpdateAtomService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async execute(request: ImportAtomsRequest): Promise<void> {
    const {
      input: { payload },
      currentUser,
    } = request

    const atoms = JSON.parse(payload)

    await this.createAtoms(atoms ?? [], currentUser)
  }

  private async createAtoms(
    atoms: Array<TestGetExport__AtomsFragment>,
    currentUser: IUser,
  ) {
    await Promise.all(
      atoms.map(async (atom) => {
        // Seed api
        let apiId: Maybe<string> = undefined

        if (atom.api) {
          const { id } = await this.importApiService.execute({
            input: {
              typeGraph: atom.api.typeGraph as any,
              api: atom.api.id,
            },
            currentUser,
          })

          apiId = id
        }

        // Seed atom
        await this.upsertAtom({
          input: {
            type: atom.type,
            name: atom.name,
            api: apiId,
          },
          currentUser,
        })
      }),
    )
  }

  /**
   * Checks if an Atom with the same AtomType exists, if not - creates it
   *
   * Returns the id if created
   */
  private async upsertAtom({
    input,
    currentUser,
  }: CreateAtomRequest): Promise<Nullable<string>> {
    const atom = await this.getAtomService.execute({
      where: { type: input.type },
    })

    if (!atom) {
      const { id } = await this.createAtomService.execute({
        input,
        currentUser,
      })

      return id
    }

    if (atom.name !== input.name || input.api) {
      await this.updateAtomService.execute({
        id: atom.id,
        data: {
          name: input.name,
          type: atom.type as AtomType,
          api: input.api ?? undefined,
        },
      })
    }

    return atom.id
  }
}
