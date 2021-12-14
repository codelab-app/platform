import {
  DgraphUseCase,
  exactlyOneWhereClause,
} from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import {
  ElementGraphSchema,
  IElement,
  IElementGraph,
} from '@codelab/shared/abstract/core'
import {
  deepLoopObjectValues,
  deepReplaceObjectValues,
  hexadecimalRegex,
} from '@codelab/shared/utils'
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
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetElementGraphRequest,
    txn: Txn,
  ) {
    exactlyOneWhereClause(request, ['id', 'componentFixedId'])

    let results: IElementGraph | undefined

    if (request.input.where.id) {
      results = await this.dgraph.executeQuery<IElementGraph>(
        txn,
        GetElementGraphService.queryById(request.input.where.id),
      )
    }

    if (request.input.where.componentFixedId) {
      results = await this.dgraph.executeQuery<IElementGraph>(
        txn,
        GetElementGraphService.queryByComponentFixedId(
          request.input.where.componentFixedId,
        ),
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
    const idRefsInProps = new Set<string>()

    graph.vertices.forEach((e) => {
      this.getHexIdsInProps(e, idRefsInProps)
    })

    const idRefsInPropsArray = Array.from(idRefsInProps)

    const result = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeQuery<
        IElementGraph & { enumValues: Array<{ id: string; value: string }> }
      >(
        txn,
        GetElementGraphService.queryById(
          idRefsInPropsArray,
          GetElementGraphService.enumValuesExtraQuery(idRefsInPropsArray),
        ),
      ),
    )

    const enumValuesMap = new Map(result.enumValues.map((e) => [e.id, e.value]))

    if (enumValuesMap?.size > 0) {
      graph.vertices.forEach((el) => {
        try {
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
      edges: [...(graph.edges ?? []), ...(result.edges ?? [])],
      vertices: [...(graph.vertices ?? []), ...(result.vertices ?? [])].map(
        (e) => {
          return {
            ...e,
            propMapBindings: e.propMapBindings ?? [],
            hooks: e.hooks ?? [],
          }
        },
      ),
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
    input: {
      where: { id },
    },
  }: GetElementGraphRequest): Promise<void> {
    await this.elementGuardService.existsAndIsOwnedBy(id, currentUser)
  }

  static enumValuesExtraQuery(ids: Array<string>) {
    return `
      enumValues(func: type(${
        DgraphEntityType.EnumTypeValue
      })) @filter(uid(${ids.join(',')})) {
        id: uid
        value: stringValue
      }
    `
  }

  static queryById(id: string | Array<string>, extraQuery?: string) {
    return `{
      ${extraQuery ?? ''}

      var(func: type(${DgraphEntityType.Element}))
        @filter(uid(${typeof id === 'string' ? id : id.join(',')}))
        @recurse
        @normalize {
          IDS AS uid
          children @filter(type(${DgraphEntityType.Element}))
          instanceOfComponent @filter(type(${DgraphEntityType.Element}))
      }

      ${GetElementGraphService.singleElementQuery(`uid(IDS)`, 'vertices')}

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

  static singleElementQuery(func: string, queryName = 'query') {
    return `${queryName}(func: ${func}) @filter(type(${DgraphEntityType.Element})) {
        id: uid
        name
        css
        instanceOfComponent {
          id: uid
        }
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
        props {
          data
          id: uid
        }
        hooks {
          id: uid
          type: hookType
          config: hookConfig {
            id: uid
            expand(_all_)
          }
        }
        componentFixedId
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
      }`
  }

  static queryByComponentFixedId(
    componentFixedId: string,
    extraQuery?: string,
  ) {
    return `{
      ${extraQuery ?? ''}

      var(func: type(${DgraphEntityType.Element}))
        @filter(eq(componentFixedId,"${componentFixedId}"))
        @recurse
        @normalize {
          IDS AS uid
          children @filter(type(${DgraphEntityType.Element}))
          instanceOfComponent @filter(type(${DgraphEntityType.Element}))
      }

      ${GetElementGraphService.singleElementQuery(`uid(IDS)`, 'vertices')}

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
