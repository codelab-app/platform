import type { IPropData } from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { titleCase } from '@codelab/shared/utils'

export const makeAllTypes = (input?: IPropData) =>
  Object.values(ITypeKind)
    .map((kind) => ({ [kind]: input }))
    .reduce((all, current) => ({ ...all, ...current }), {})

export const getApiName = (name: string) => {
  return `${name} API`
}

export const getInterfaceName = (type: string) => `${titleCase(type)} API`

// export const makeFieldsCreateInput = (type: ICreateTypeDTO) => {
//   return {
//     connect: type.fields.map((f) => ({
//       where: { node: { id: f.type.id } },
//       edge: { name: f.name, description: f.description, key: f.key },
//     })),
//   }
// }
