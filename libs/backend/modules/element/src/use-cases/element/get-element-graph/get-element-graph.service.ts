import { UseCasePort } from '@codelab/backend/abstract/core'
import { exactlyOneWhereClause } from '@codelab/backend/application'
import { ITransaction } from '@codelab/backend/infra'
import {
  ElementGraphSchema,
  IElement,
  IElementGraph,
} from '@codelab/shared/abstract/core'
import { Entity, Maybe } from '@codelab/shared/abstract/types'
import {
  deepLoopObjectValues,
  deepReplaceObjectValues,
  hexadecimalRegex,
} from '@codelab/shared/utils'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { GetElementGraphRequest } from './get-element-graph.request'

@Injectable()
export class GetElementGraphService
  implements UseCasePort<GetElementGraphRequest, IElementGraph | undefined>
{
  schema = ElementGraphSchema

  returnParsed = false

  constructor(
    @Inject(IElementRepositoryToken)
    protected readonly elementRepository: IElementRepository,
    private elementGuardService: ElementValidator,
  ) {}

  async execute(
    request: GetElementGraphRequest,
  ): Promise<IElementGraph | undefined> {
    exactlyOneWhereClause(request, ['id', 'fixedId'])

    const {
      input: { where },
      transaction,
    } = request

    let results: Maybe<IElementGraph>

    if (where.id) {
      results = await this.elementRepository.getGraph(where.id, transaction)
    }

    if (where.fixedId) {
      results = await this.elementRepository.getGraphByFixedId(
        where.fixedId,
        transaction,
      )
    }

    if (!results) {
      throw new Error('Invalid request, exactly one where clause required')
    }

    return this.postProcessResults(results, transaction)
  }

  private async postProcessResults(
    graph: IElementGraph,
    transaction: ITransaction,
  ): Promise<IElementGraph> {
    // We can provide Component ids as props. Since they are likely outside the tree, we need
    // to fetch them and put them in there, so they're available
    const idRefsInProps = new Set<string>()

    graph.vertices.forEach((e) => {
      this.getHexIdsInProps(e, idRefsInProps)
    })

    const idRefsInPropsArray = Array.from(idRefsInProps)

    const extraElementsGraph = await this.elementRepository.getGraphByRootIds(
      idRefsInPropsArray,
      transaction,
    )

    const enumValues = await this.elementRepository.getEnumValues(
      idRefsInPropsArray,
      transaction,
    )

    const enumValuesMap = new Map(enumValues.map((e) => [e.id, e.value]))

    if (enumValuesMap?.size > 0) {
      graph.vertices.forEach((el) => {
        try {
          // Replace the enum values with the actual values
          el.props.data = JSON.stringify(
            deepReplaceObjectValues(JSON.parse(el.props.data), (value) => {
              if (enumValuesMap.has(value)) {
                return enumValuesMap.get(value)
              }

              return value
            }),
          )
        } catch (err: any) {
          Logger.error('Error while parsing props', err)
        }
      })
    }

    return {
      edges: [...(graph.edges ?? []), ...(extraElementsGraph.edges ?? [])],
      vertices: [
        ...(graph.vertices ?? []),
        ...(extraElementsGraph.vertices ?? []),
      ].map((e) => {
        return {
          ...e,
          propMapBindings: e.propMapBindings ?? [],
          hooks: e.hooks ?? [],
        }
      }),
    }
  }

  private getHexIdsInProps(element: IElement, ids: Set<string>) {
    if (!element?.props?.data) {
      return
    }

    try {
      const props = JSON.parse(element.props.data)

      // Get all values that look like dgraph ids
      // It's way simpler than previous attempts to parse the type tree
      // And way faster, since we don't need to fetch the whole type tree

      deepLoopObjectValues(props, (value) => {
        if (typeof value === 'string' && hexadecimalRegex.test(value)) {
          ids.add(value)
        }
      })
    } catch (e) {
      Logger.error(`Error while parsing props ${element.props}.`, e)
    }
  }

  protected async validate({
    currentUser,
    transaction,
    input: {
      where: { id },
    },
  }: GetElementGraphRequest): Promise<void> {
    await this.elementGuardService.existsAndIsOwnedBy(
      id,
      currentUser,
      transaction,
    )
  }
}
