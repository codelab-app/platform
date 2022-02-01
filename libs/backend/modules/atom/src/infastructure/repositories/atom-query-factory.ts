import { DgraphEntityType, IQueryFactory } from '@codelab/backend/abstract/core'
import { makeFilterString } from '@codelab/backend/infra'

export class AtomQueryFactory implements IQueryFactory {
  static readonly atomFragment = `
        id: uid
        type: atomType
        name
        api {
          id: uid
          expand(_all_)
        }`

  forGet(filter?: string, queryName?: string): string {
    const filterString = makeFilterString(filter)

    return `{
      ${queryName}(func: type(${DgraphEntityType.Atom})) ${filterString} {
          ${AtomQueryFactory.atomFragment}
      }
    }`
  }

  public forGetByElement(elementId: string) {
    return `{
     var (func: uid(${elementId})) @filter(type(${DgraphEntityType.Element})) {
        atom {
          ATOM_ID as uid
        }
      }

      query(func: type(${DgraphEntityType.Atom})) @filter(uid(ATOM_ID)) {
          ${AtomQueryFactory.atomFragment}
      }
    }`
  }
}
