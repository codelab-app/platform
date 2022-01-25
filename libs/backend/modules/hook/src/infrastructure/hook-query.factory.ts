import {
  DgraphEntityType,
  IQueryFactory,
  makeFilterString,
} from '@codelab/backend/infra'

export class HookQueryFactory implements IQueryFactory {
  static readonly hookFragment = `
            id: uid
            type: hookType
            config: hookConfig {
              id: uid
              expand(_all_)
            }`

  forGet(filter?: string, queryName = 'getHook'): string {
    const filterString = makeFilterString(filter)

    return `{
      ${queryName}(func: type(${DgraphEntityType.Hook})) ${filterString} {
        ${HookQueryFactory.hookFragment}
      }
    }`
  }
}
