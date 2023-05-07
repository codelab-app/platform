import type { AntDesignField } from '@codelab/backend/abstract/core'
import type { IAtomDTO, IAuth0Owner } from '@codelab/frontend/abstract/core'
import { DefaultTypeAdapterService } from '../default-type-adapter/default-type-adapter.service'

interface Request {
  atom: IAtomDTO
  field: Pick<AntDesignField, 'property' | 'type'>
  owner: IAuth0Owner
}

export class AntdTypeAdapterService extends DefaultTypeAdapterService {}
