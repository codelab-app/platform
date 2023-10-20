import type { IAtomModel } from '@codelab/frontend/abstract/domain'

export const onLibraryFilter = (
  value: boolean | number | string,
  atom: IAtomModel,
): boolean => {
  const list = [atom.name, atom.type].map((item) => item.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((item) => item.startsWith(search))
}
