import type { ITypeExport } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { SortDirection } from '@codelab/backend/abstract/codegen'
import {
  ActionTypeRepository,
  CodeMirrorTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  RichTextTypeRepository,
} from '@codelab/backend/domain/type'
import {
  ActionTypeSchema,
  CodeMirrorTypeSchema,
  PrimitiveTypeSchema,
  ReactNodeTypeSchema,
  RenderPropTypeSchema,
  RichTextTypeSchema,
} from '@codelab/shared/abstract/core'
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
  implements ICommandHandler<ExportSystemTypesCommand, Array<ITypeExport>>
{
  constructor(
    private primitiveTypeRepository: PrimitiveTypeRepository,
    private reactNodeTypeRepository: ReactNodeTypeRepository,
    private richTextTypeRepository: RichTextTypeRepository,
    private renderPropTypeRepository: RenderPropTypeRepository,
    private actionTypeRepository: ActionTypeRepository,
    private codeMirrorTypeRepository: CodeMirrorTypeRepository,
  ) {}

  async execute() {
    /**
     * Export all primitive types
     */
    const primitiveTypes = await this.primitiveTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: PrimitiveTypeSchema,
    })

    /**
     * React Node Type
     */
    // Only 1 here
    const reactNodeTypes = await this.reactNodeTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: ReactNodeTypeSchema,
    })

    /**
     * Rich Text Type
     */
    // Only 1 here
    const richTextTypes = await this.richTextTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: RichTextTypeSchema,
    })

    /**
     * Render Props Type
     */
    // Only 1 here
    const renderPropTypes = await this.renderPropTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: RenderPropTypeSchema,
    })

    /**
     * ActionType
     */

    const actionTypes = await this.actionTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: ActionTypeSchema,
    })

    const codeMirrorTypes = await this.codeMirrorTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: CodeMirrorTypeSchema,
    })

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
      ...richTextTypes,
      ...codeMirrorTypes,
    ]
  }
}
