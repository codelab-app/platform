import type { InterfaceTypeCreateInput } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const createInterfaceTypeName = (name: string) => {
  return `${name} API`
}
