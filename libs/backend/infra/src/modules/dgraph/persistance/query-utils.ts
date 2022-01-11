import { MaybeOrNullable } from '@codelab/shared/abstract/types'

export const makeUidsFilter = (uids: Array<string>): string | undefined => {
  return makeUidFilter(uids.length > 0 ? uids.join(',') : undefined)
}

export const makeUidFilter = <TUid extends MaybeOrNullable<string>>(
  uid: TUid,
): TUid extends string ? string : undefined => {
  return uid ? `uid(${uid})` : (undefined as any)
}
