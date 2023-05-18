import type { AtomRecord } from '../columns'

export const onLibraryFilter = (
  value: boolean | number | string,
  atom: AtomRecord,
): boolean => {
  const list = [atom.name, atom.type].map((item) => item.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((item) => item.startsWith(search))
}
