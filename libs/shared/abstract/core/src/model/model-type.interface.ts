import { Kind, type TSchema } from '@sinclair/typebox'
import { ObjectTyped } from 'object-typed'

export const IModelKinds = {
  ActionType: 'ActionType',
  App: 'App',
  EnumType: 'EnumType',
  InterfaceType: 'InterfaceType',
  Prop: 'Prop',
  User: 'User',
} as const