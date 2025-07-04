import type { ITypeDtoWithoutOwner } from '@codelab/shared-abstract-core'
import type { ICommandHandler } from '@nestjs/cqrs'

import {
  ActionTypeRepository,
  CodeMirrorTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  RichTextTypeRepository,
  UnionTypeRepository,
} from '@codelab/backend-domain-type'
import {
  ActionTypeSchema,
  CodeMirrorTypeSchema,
  PrimitiveTypeSchema,
  ReactNodeTypeSchema,
  RenderPropTypeSchema,
  RichTextTypeSchema,
  UnionTypeSchema,
} from '@codelab/shared-abstract-core'
import { SortDirection } from '@codelab/shared-infra-gqlgen'
import { CommandHandler } from '@nestjs/cqrs'
import { Type } from '@sinclair/typebox'

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
  implements
    ICommandHandler<ExportSystemTypesCommand, Array<ITypeDtoWithoutOwner>>
{
  constructor(
    private primitiveTypeRepository: PrimitiveTypeRepository,
    private reactNodeTypeRepository: ReactNodeTypeRepository,
    private richTextTypeRepository: RichTextTypeRepository,
    private renderPropTypeRepository: RenderPropTypeRepository,
    private actionTypeRepository: ActionTypeRepository,
    private codeMirrorTypeRepository: CodeMirrorTypeRepository,
    private unionTypeRepository: UnionTypeRepository,
  ) {}

  async execute() {
    /**
     * Export all primitive types
     */
    const primitiveTypes = await this.primitiveTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: Type.Omit(PrimitiveTypeSchema, ['owner']),
    })

    /**
     * React Node Type
     */
    // Only 1 here
    const reactNodeTypes = await this.reactNodeTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: Type.Omit(ReactNodeTypeSchema, ['owner']),
    })

    /**
     * Rich Text Type
     */
    // Only 1 here
    const richTextTypes = await this.richTextTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: Type.Omit(RichTextTypeSchema, ['owner']),
    })

    /**
     * Render Props Type
     */
    // Only 1 here
    const renderPropTypes = await this.renderPropTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: Type.Omit(RenderPropTypeSchema, ['owner']),
    })

    /**
     * ActionType
     */

    const actionTypes = await this.actionTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: Type.Omit(ActionTypeSchema, ['owner']),
    })

    const codeMirrorTypes = await this.codeMirrorTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: Type.Omit(CodeMirrorTypeSchema, ['owner']),
    })

    /**
     * Union Type
     */
    const unionTypes = await this.unionTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: Type.Omit(UnionTypeSchema, ['owner']),
      where: {
        // This type is re-used across all React atoms, so we make it into a system type
        name: 'AtomChildren Union',
      },
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
      ...unionTypes,
    ]
  }
}
