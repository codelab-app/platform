import { CypressCommand } from '../types'
import { resetDatabase } from './admin'
import { createApp } from './app'
import { createAtom } from './atom'
import { createComponent } from './component'
import { createElement, updateElement } from './element'
import { createField } from './field'
import { createPage, getPages } from './page'
import { createResource } from './resource'
import { createStore } from './store'
import { createTag } from './tag'
import { createType } from './type'
import { createUser, getCurrentUserId } from './user'

export interface CypressDatabaseCommands {
  /** app model */
  createApp: typeof createApp

  /** page model */
  createPage: typeof createPage
  getPages: typeof getPages

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
  { name: 'createUser', fn: createUser },
  { name: 'createTag', fn: createTag },
  { name: 'createApp', fn: createApp },
  { name: 'createPage', fn: createPage },
  { name: 'getPages', fn: getPages },
  { name: 'resetDatabase', fn: resetDatabase },
  // { name: 'exportAdminData', fn: exportAdminData },
  // { name: 'importAdminData', fn: importAdminData },
  { name: 'createComponent', fn: createComponent },
  { name: 'createElement', fn: createElement },
  { name: 'updateElement', fn: updateElement },
  { name: 'createAtom', fn: createAtom },
  { name: 'createField', fn: createField },
  { name: 'createType', fn: createType },
  { name: 'getCurrentUserId', fn: getCurrentUserId },
  { name: 'createStore', fn: createStore },
  { name: 'createResource', fn: createResource },
]
