import {
  DgraphUseCase,
  exactlyOneWhereClause,
} from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { HookModelFactory } from '@codelab/backend/modules/hook'
import {
  ElementGraphSchema,
  IElement,
  IElementGraph,
} from '@codelab/shared/abstract/core'
import { deepLoopObjectValues, hexadecimalRegex } from '@codelab/shared/utils'
import { Injectable, Logger } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
import { GetElementGraphRequest } from './get-element-graph.request'

@Injectable()
/**
 * Recursively gets the entire tree starting from the root Element node
 */
export class GetElementGraphService extends DgraphUseCase<
  GetElementGraphRequest,
  IElementGraph
> {
  schema = ElementGraphSchema

  returnParsed = false

  constructor(
    protected readonly dgraph: DgraphRepository,
    private elementGuardService: ElementValidator,
    private hookFactory: HookModelFactory,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetElementGraphRequest,
    txn: Txn,
  ) {
    exactlyOneWhereClause(request, ['id'])

    let results: IElementGraph | undefined

    if (request.input.where.id) {
      results = await this.dgraph.executeQuery<IElementGraph>(
        txn,
        GetElementGraphService.queryById(request.input.where.id),
      )
    }

    if (!results) {
      throw new Error('Missing params')
    }

    return this.postProcessResults(results)
  }

  private async postProcessResults(
    graph: IElementGraph,
  ): Promise<IElementGraph> {
    // We can provide Component ids as props. Since they are likely outside the tree, we need
    // to fetch them and put them in there, so they're available
    const extraElementIdsToFetch = new Set<string>()

    graph.vertices.forEach((e) => {
      this.getComponentIdFromProps(e, extraElementIdsToFetch)
    })

    const extraElements = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeQuery<IElementGraph>(
        txn,
        GetElementGraphService.queryById(Array.from(extraElementIdsToFetch)),
      ),
    )

    return {
      edges: [...(graph.edges ?? []), ...(extraElements.edges ?? [])],
      vertices: [
        ...(graph.vertices ?? []),
        ...(extraElements.vertices ?? []),
      ].map((e) => {
        return {
          ...e,
          propMapBindings: e.propMapBindings ?? [],
          // TODO remove this once we change hooks to use interface
          // Make sure the hook configs are instances of Hook config objects, otherwise graphql won't figure out which type to use
          hooks: this.hookFactory.map(e.hooks ?? []),
        }
      }),
    }
  }

  private getComponentIdFromProps(element: IElement, ids: Set<string>) {
    if (!element?.props) {
      return
    }

    try {
      const props = JSON.parse(element.props)

      // Get all values that look like dgraph ids
      // It's way simpler than previous attempts to parse the type tree
      // And way faster, since we don't need to fetch the whole type tree
      // We are sure the ids are elements, since in the query later we filter by type(Element)
      // It will also work for future Element references without need of modification

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
    input: {
      where: { id },
    },
  }: GetElementGraphRequest): Promise<void> {
    await this.elementGuardService.existsAndIsOwnedBy(id, currentUser)
  }

  private static queryById(id: string | Array<string>) {
    return `{
      var(func: type(${DgraphEntityType.Element}))
        @filter(uid(${typeof id === 'string' ? id : id.join(',')}))
        @recurse
        @normalize {
          IDS AS uid
          children
      }

      vertices(func: uid(IDS)) {
        id: uid
        name
        css
        componentTag {
          id: uid
          expand(_all_)
        }
        atom {
          id: uid
          type: atomType
          name
          api {
            id: uid
            expand(_all_)
          }
        }
        props
        hooks {
          id: uid
          type: hookType
          config: configJson
        }
        renderForEachPropKey
        renderIfPropKey
        propMapBindings @normalize {
          id: uid
          sourceKey: sourceKey
          targetKey: targetKey
          targetElement {
            targetElementId: uid
          }
        }
        propTransformationJs
      }

      edges(func: uid(IDS))
        @normalize
        @cascade {
          source: uid
          children @facets(order: order) {
          target: uid
        }
      }
    }`
  }
}
