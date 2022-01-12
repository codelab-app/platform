import {
  DgraphEntityType,
  IQueryFactory,
  makeFilterString,
} from '@codelab/backend/infra'

export class PropMapBindingQueryFactory implements IQueryFactory {
  /** Use with @normalize */
  static queryFragment() {
    return `id: uid
            sourceKey: sourceKey
            targetKey: targetKey
            targetElement {
              targetElementId: uid
            }`
  }

  forGet(filter?: string, queryName = 'getPropMapBinding'): string {
    const filterString = makeFilterString(filter)

    return `{
      ${queryName}(func: type(${
      DgraphEntityType.PropMapBinding
    })) ${filterString} @normalize  {
        ${PropMapBindingQueryFactory.queryFragment()}
      }
    }`
  }
}
