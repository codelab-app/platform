import { SnapshotOutOf } from 'mobx-keystone'
import { IApp } from '../app'
import { IAtom } from '../atom'
import { IElement } from '../element'
import { IPage } from '../page'
import { IAnyType } from '../type'

export interface AdminExportPayload {
  atoms: Array<SnapshotOutOf<IAtom>>
  types: Array<SnapshotOutOf<IAnyType>>
  apps: Array<
    Omit<SnapshotOutOf<IApp>, 'pages'> & {
      pages: Array<SnapshotOutOf<IPage & { elements: Array<IElement> }>>
    }
  >
}
