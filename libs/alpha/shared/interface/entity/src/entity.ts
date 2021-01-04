export enum StateNameEntity {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  EDITING = 'EDITING',
  EDIT_SUBMITTING = 'EDIT_SUBMITING',
  EDITED = 'EDITED',
  CREATING = 'CREATING',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  DELETING = 'DELETING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

/**
 * "I" stands for input, think of a create form
 */
export type EntityI = Record<string, any>

/**
 * "A" stands for actually, think of data queries from database.
 *
 * Here the id is required, since database has auto-assigned a UUID when storing the record
 */
export interface EntityA extends EntityI {
  id: string
}
