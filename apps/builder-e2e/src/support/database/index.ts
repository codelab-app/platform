import type { CypressCommand } from '../types'
import { resetDatabase } from './admin'
import { createApp } from './app'
import { createAtom } from './atom'
import { createComponent } from './component'
import { createElement, updateElement } from './element'
import { createField } from './field'
import { createResource } from './resource'
import { createStore } from './store'
import { createTag } from './tag'
import { createType } from './type'
import { createUser, getCurrentOwner } from './user'

export interface CypressDatabaseCommands {
  /** app model */
  createApp: typeof createApp

  /** element model */
  createAtom: typeof createAtom
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

  /** tag model */
  createTag: typeof createTag
  createType: typeof createType

  createUser: typeof createUser

  getCurrentOwner: typeof getCurrentOwner

  /** admin model */
  resetDatabase: typeof resetDatabase

  /** element model */
  updateElement: typeof updateElement
}

export const databaseCommands: Array<CypressCommand> = [
  { fn: createUser, name: 'createUser' },
  { fn: createTag, name: 'createTag' },
  { fn: createApp, name: 'createApp' },
  { fn: resetDatabase, name: 'resetDatabase' },
  // { name: 'exportAdminData', fn: exportAdminData },
  // { name: 'importAdminData', fn: importAdminData },
  { fn: createComponent, name: 'createComponent' },
  { fn: createElement, name: 'createElement' },
  { fn: updateElement, name: 'updateElement' },
  { fn: createAtom, name: 'createAtom' },
  { fn: createField, name: 'createField' },
  { fn: createType, name: 'createType' },
  { fn: getCurrentOwner, name: 'getCurrentOwner' },
  { fn: createStore, name: 'createStore' },
  { fn: createResource, name: 'createResource' },
]
