import { DgraphEntityType } from '@codelab/backend/abstract/core'

export const getTagQuery = (filter = '', queryName = 'query') => {
  return `{
      ${queryName}(func: type(${DgraphEntityType.Tag})) ${filter} @recurse {
        id: uid
        expand(_all_)
      }
    }`
}

export const mapDgraphTag = (dgraphTag: any) =>
  dgraphTag
    ? {
        ...dgraphTag,
        parent: dgraphTag?.parent?.id,
        children: dgraphTag?.children?.map((child: any) => child.id) ?? [],
      }
    : null
