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
import { createUser, getCurrentUserId } from './user'

export interface CypressDatabaseCommands {
  /** app model */
  createApp: typeof createApp

  /** admin model */
  resetDatabase: typeof resetDatabase
  createUser: typeof createUser
  // importAdminData: typeof importAdminData
  // exportAdminData: typeof exportAdminData

  /** component model */
  createComponent: typeof createComponent

  /** element model */
  updateElement: typeof updateElement
  createElement: typeof createElement

  /** element model */
  createAtom: typeof createAtom

  /** type model */
  createField: typeof createField
  createType: typeof createType

  /** tag model */
  createTag: typeof createTag

  getCurrentUserId: typeof getCurrentUserId

  /** store model */
  createStore: typeof createStore

  /** resource model */
  createResource: typeof createResource
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
  { fn: getCurrentUserId, name: 'getCurrentUserId' },
  { fn: createStore, name: 'createStore' },
  { fn: createResource, name: 'createResource' },
]
