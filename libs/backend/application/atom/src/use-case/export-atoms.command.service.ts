import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportApisCommand } from '@codelab/backend-application-type'
import { AtomRepository } from '@codelab/backend-domain-atom'
import {
  AtomAggregateSchema,
  AtomSchema,
  type IApiAggregate,
  type IAtomAggregate,
} from '@codelab/shared-abstract-core'
import { type AtomWhere } from '@codelab/shared-infra-gqlgen'
import { Validator } from '@codelab/shared-infra-typebox'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { Type } from '@sinclair/typebox'

export class ExportAtomsCommand {
  constructor(readonly ids?: Array<string>, readonly where?: AtomWhere) {}
}

@CommandHandler(ExportAtomsCommand)
export class ExportAtomsHandler
  implements ICommandHandler<ExportAtomsCommand, Array<IAtomAggregate>>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ExportAtomsCommand): Promise<Array<IAtomAggregate>> {
    const { ids, where } = command
    // Construct where clause
    const whereClause: AtomWhere = ids?.length ? { id_IN: ids } : where || {}

    // Fetch all atoms with their relations in ONE query
    const atoms = await this.atomRepository.find({
      schema: Type.Omit(AtomSchema, ['owner']),
      where: whereClause,
    })

    if (!atoms.length) {
      return []
    }

    // Extract unique API refs
    const apiRefs = [...new Set(atoms.map((atom) => atom.api.id))].map(
      (id) => ({
        __typename: 'InterfaceType' as const,
        id,
      }),
    )

    // Batch fetch all APIs in ONE query using the new batch command
    const apis = await this.commandBus.execute<
      ExportApisCommand,
      Array<IApiAggregate>
    >(new ExportApisCommand(apiRefs))

    // Create API lookup map for O(1) access
    const apiMap = new Map(apis.map((api) => [api.id, api]))

    // Assemble results
    const results: Array<IAtomAggregate> = atoms.map((atom) => {
      const api = apiMap.get(atom.api.id)

      if (!api) {
        throw new Error(`API not found for atom ${atom.id}`)
      }

      const atomData = {
        ...atom,
        __typename: 'Atom' as const,
        api,
        requiredParents: atom.requiredParents?.sort((a, b) =>
          a.id.localeCompare(b.id),
        ),
        suggestedChildren: atom.suggestedChildren?.sort((a, b) =>
          a.id.localeCompare(b.id),
        ),
        tags: atom.tags?.map((tag) => ({ id: tag.id })),
      }

      return Validator.parse(AtomAggregateSchema, { api, atom: atomData })
    })

    return results
  }
}
