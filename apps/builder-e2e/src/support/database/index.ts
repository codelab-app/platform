import type { CypressCommand } from '../types'
import { resetDatabase } from './admin'
import { createComponent } from './component'
import { createElement, updateElement } from './element'
import { createField } from './field'
import { createResource } from './resource'
import { createStore } from './store'
import { createUser, getCurrentOwner } from './user'

export interface CypressDatabaseCommands {
  // importAdminData: typeof importAdminData
  // exportAdminData: typeof exportAdminData
  /** component model */
  createComponent: typeof createComponent

  createElement: typeof createElement

  /** type model */
  createField: typeof createField
  /** resource model */
  createResource: typeof createResource

  /** store model */
  createStore: typeof createStore

  createUser: typeof createUser

  getCurrentOwner: typeof getCurrentOwner

  /** admin model */
  resetDatabase: typeof resetDatabase

  /** element model */
  updateElement: typeof updateElement
}

export const databaseCommands: Array<CypressCommand> = [
  { fn: createUser, name: 'createUser' },
  { fn: resetDatabase, name: 'resetDatabase' },
  // { name: 'exportAdminData', fn: exportAdminData },
  // { name: 'importAdminData', fn: importAdminData },
  { fn: createComponent, name: 'createComponent' },
  { fn: createElement, name: 'createElement' },
  { fn: updateElement, name: 'updateElement' },
  { fn: createField, name: 'createField' },
  { fn: getCurrentOwner, name: 'getCurrentOwner' },
  { fn: createStore, name: 'createStore' },
  { fn: createResource, name: 'createResource' },
]
