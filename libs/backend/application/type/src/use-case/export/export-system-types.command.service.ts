import { SortDirection } from '@codelab/backend/abstract/codegen'
import {
  IPrimitiveTypeOutputDto,
  type ITypeOutputDto,
  TypeOutput,
} from '@codelab/backend/abstract/core'
import {
  ActionTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
} from '@codelab/backend/domain/type'
import {
  IActionTypeDTO,
  IPrimitiveTypeDTO,
  IReactNodeTypeDTO,
  IRenderPropTypeDTO,
} from '@codelab/shared/abstract/core'
import { Span } from '@codelab/shared/infra/otel'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

/**
 * Before we had 3 separate type exports (seed, user, admin). But we can combine into a single logic that takes type ids only
 *
 * In this new use case
 *
 * 1) we'll first export all seed types
 * 2) Get all type ids from args, and all dependent types
 * 3) Lastly we'll fetch all related fields
 *
 * We may have some duplicate data, but saving during type will make sure data is overwritten. We could also clean the data during final export to reduce duplicate data
 */

export class ExportSystemTypesCommand {}

/**
 * These are required system types that other types reference
 */
@CommandHandler(ExportSystemTypesCommand)
export class ExportSystemTypesHandler
  implements ICommandHandler<ExportSystemTypesCommand, Array<ITypeOutputDto>>
{
  constructor(
    private primitiveTypeRepository: PrimitiveTypeRepository,
    private reactNodeTypeRepository: ReactNodeTypeRepository,
    private renderPropTypeRepository: RenderPropTypeRepository,
    private actionTypeRepository: ActionTypeRepository,
  ) {}

  @Span()
  async execute() {
    /**
     * Export all primitive types
     */
    const primitiveTypes = await this.primitiveTypeRepository.find(
      {
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
      },
      IPrimitiveTypeOutputDto,
    )

    /**
     * React Node Type
     */
    // Only 1 here
    const reactNodeTypes = await this.reactNodeTypeRepository.find(
      {
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
      },
      TypeOutput(IReactNodeTypeDTO),
    )

    /**
     * Render Props Type
     */
    // Only 1 here
    const renderPropTypes = await this.renderPropTypeRepository.find(
      {
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
      },
      TypeOutput(IRenderPropTypeDTO),
    )

    /**
     * ActionType
     */

    const actionTypes = await this.actionTypeRepository.find(
      {
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
      },
      TypeOutput(IActionTypeDTO),
    )

    /**
     * Here we create the interface dependency tree order
     *
     * Further to the front are closer to the leaf.
     */
    return [
      ...primitiveTypes,
      ...renderPropTypes,
      ...reactNodeTypes,
      ...actionTypes,
    ]
  }
}
