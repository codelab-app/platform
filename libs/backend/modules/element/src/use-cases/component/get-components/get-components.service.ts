import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { ElementsSchema, IElement } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import Fuse from 'fuse.js'
import { GetComponentsRequest } from './get-components.request'

@Injectable()
export class GetComponentsService extends DgraphUseCase<
  GetComponentsRequest,
  Array<IElement>
> {
  schema = ElementsSchema

  protected async executeTransaction(request: GetComponentsRequest, txn: Txn) {
    const results = await this.dgraph.getAllNamed<IElement>(
      txn,
      this.getQuery(request),
      'query',
    )

    if (request?.input?.searchQuery) {
      const fuse = new Fuse(results, {
        keys: ['name', 'componentTag.name'],
        shouldSort: true,
        isCaseSensitive: false,
      })

      return fuse.search(request.input.searchQuery).map((r) => r.item)
    }

    return results
  }

  protected getQuery({ currentUser, input }: GetComponentsRequest) {
    const nameFilter = input?.searchQuery
      ? ` AND match(name, "${input.searchQuery}", 10)`
      : ''

    // Get all elements, that:
    // - have a component tag
    // - are either owned by the current user OR
    //    - are not owned by anyone
    return `{
      query(func: type(${DgraphEntityType.Element}))
        @filter((uid_in(owner, ${
          currentUser.id
        }) OR NOT has(owner)) AND has(componentTag) ${nameFilter ?? ''}) {
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
        props {
          id: uid
          data
        }
        hooks {
          id: uid
          type: hookType
          config: hookConfig
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
    }
    `
  }
}
