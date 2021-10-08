import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { ElementsSchema, IElement } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetComponentsRequest } from './get-components.request'

@Injectable()
export class GetComponentsService extends DgraphUseCase<
  GetComponentsRequest,
  Array<IElement>
> {
  schema = ElementsSchema

  protected async executeTransaction(request: GetComponentsRequest, txn: Txn) {
    return this.dgraph.getAllNamed<IElement>(
      txn,
      this.getQuery(request),
      'query',
    )
  }

  protected getQuery({ currentUser }: GetComponentsRequest) {
    return `{
      query(func: type(${DgraphEntityType.Element}))
        @filter(uid_in(owner, ${currentUser.id}) AND has(componentTag)) {
        id: uid
        name
        css
        componentTag {
          id: uid
          expand(_all_)
        }
        atom {
          id: uid
          expand(_all_)
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
    }
    `
  }
}
