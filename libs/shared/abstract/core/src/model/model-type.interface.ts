import { Kind, type TSchema } from '@sinclair/typebox'
import { ObjectTyped } from 'object-typed'

export const IModelKinds = {
  App: 'App',
  InterfaceType: 'InterfaceType',
  Prop: 'Prop',
  User: 'User',
} as const
