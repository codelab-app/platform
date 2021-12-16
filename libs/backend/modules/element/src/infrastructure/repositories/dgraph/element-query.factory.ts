import {
  DgraphEntityType,
  IQueryFactory,
  makeFilterString,
} from '@codelab/backend/infra'
import { HookQueryFactory } from '@codelab/backend/modules/hook'
import { PropMapBindingQueryFactory } from './prop-map-binding-query.factory'

export class ElementQueryFactory implements IQueryFactory {
  /** Core inner fragment for all Element-related queries */
  static queryFragment() {
    return `
        id: uid
        fixedId
        name
        css
        propTransformationJs
        renderForEachPropKey
        renderIfPropKey
        owner {
          id: uid
        }
        parentElement: ~children  @facets(order: order) {
          id: uid
        }
        instanceOfComponent {
          id: uid
        }
        componentTag {
          id: uid
          name
          isRoot
          owner {
            id: uid
          }
          children {
            id: uid
          }
          parent {
            id: uid
          }
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
          id: uid
          expand(_all_)
        }
        hooks {
          ${HookQueryFactory.queryFragment()}
        }
        propMapBindings @normalize {
          ${PropMapBindingQueryFactory.queryFragment()}
        }
        `
  }

  /** Response is of type {@see IElement} */
  forGet(filter?: string, queryName = 'getElement'): string {
    const filterString = makeFilterString(filter)

    return `{
      ${queryName}(func: type(${DgraphEntityType.Element})) ${filterString} {
        ${ElementQueryFactory.queryFragment()}
      }
    }`
  }

  /** Response is of type {@see GetParentElementIdQueryResult} */
  forGetParentElement(elementId: string, queryName = 'elementParent') {
    return `{
      ${queryName}(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId})) @normalize {
        ~children {
          parentId: uid
        }
      }
    }`
  }

  /** Response is of type {@see GetLastOrderInParentQueryResult} */
  forGetLastOrderInParent(parentId: string, queryName = 'orderInParent') {
    return `{
      ${queryName}(func: type(${DgraphEntityType.Element})) @filter(uid(${parentId})) @normalize {
        children @facets(orderdesc: order, lastOrder: order) (first:1) {
          parentId: uid
        }
      }
    }`
  }

  /** Response is of type {@see ElementAndOwnerQueryResult}. Use with executeQuery, not with getOne */
  forElementAndOwner(elementId: string) {
    return `{
            var(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId}))  @recurse {
              OWNER as owner
              ~children
              ~root
              ~pages
            }

            element(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId})){
              id: uid
              owner {
                id: uid
              }
            }

            rootOwner(func: uid(OWNER)) @filter(type(${DgraphEntityType.User})) {
              id: uid
            }
          }`
  }

  /** Response is of type {@see GetRootContainerQueryResult} */
  forGetRootContainerId(elementId: string, queryName = 'getRootContainerId') {
    return `{
          ${queryName}(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId})) @normalize {
            ~root {
              containerId: uid
            }
          }
        }`
  }

  /** Response is of type {@see GetReferencesQueryResult} */
  forGetReferences(elementId: string, queryName = 'getReferences') {
    return `{
          ${queryName}(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId}))  {
            parents: ~children {
              id: uid
              name
            }
            instances: ~instanceOfComponent {
              id: uid
              name
            }
          }
        }`
  }

  /** Common graph query used by other queries, Response is of type {@see IElementGraph} */
  protected forGetGraph(filter: string) {
    return `{
      var(func: type(${DgraphEntityType.Element}))
        @filter(${filter})
        @recurse
        @normalize {
          IDS AS uid
          children @filter(type(${DgraphEntityType.Element}))
          instanceOfComponent @filter(type(${DgraphEntityType.Element}))
      }

      vertices(func: type(${DgraphEntityType.Element})) @filter(uid(IDS)) {
        ${ElementQueryFactory.queryFragment()}
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

  /** Response is of type {@see IElementGraph}. Use executeQuery */
  forGetGraphByRootId(elementId: string) {
    return this.forGetGraph(`uid(${elementId})`)
  }

  /** Response is of type {@see IElementGraph}. Use executeQuery */
  forGetGraphByRootIds(elementIds: Array<string>) {
    return this.forGetGraph(`uid(${elementIds.join(',')})`)
  }

  /** Response is of type {@see IElementGraph}. Use executeQuery  */
  forGetGraphByFixedId(fixedId: string) {
    return this.forGetGraph(`eq(fixedId,"${fixedId}")`)
  }

  /** Response is of type {@see ForEnumValuesQueryResult} */
  forEnumValues(enumValueIds: Array<string>, queryName = 'enumValues') {
    return `{
       ${queryName}(func: type(${
      DgraphEntityType.EnumTypeValue
    })) @filter(uid(${enumValueIds.join(',')})) {
        id: uid
        value: stringValue
      }
    }`
  }
}

export interface GetParentElementIdQueryResult {
  parentId?: string
}

export interface GetLastOrderInParentQueryResult {
  parentId?: string
  lastOrder?: number
}

export interface ElementAndOwnerQueryResult {
  rootOwner?: Array<{ id?: string }>
  element?: Array<{ id: string; owner?: { id: string } }>
}

export interface GetRootContainerQueryResult {
  containerId?: string
}

export interface ForEnumValuesQueryResult {
  id: string
  value: string
}

export interface GetReferencesQueryResult {
  parents?: Array<{ id: string; name: string }>
  instances?: Array<{ id: string; name: string }>
}
