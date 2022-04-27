/* eslint-disable no-inline-comments */
import { Ref } from 'mobx-keystone'

export type UnboxNullableRef<Entity extends object | Array<object> = never> =
  // If entity is an array
  | (Entity extends Array<infer U>
      ? U extends object
        ? // Return array of ref
          Array<Ref<U>>
        : never
      : // If entity is an object
      Entity extends object
      ? // Return Ref
        Ref<Entity>
      : never)
  | null
