/* eslint-disable @typescript-eslint/ban-types */

import type { Assign } from 'utility-types'
/**
 * Identity type that forces TypeScript to compute object types, but only works for hovering the newly assigned type. If we hover source type it becomes more complicated.
 *
 * So it is recommended to assign to a new type for complex types
 *
 * ---
 *
 * The `& {}` pattern forces TypeScript to eagerly compute and display the expanded type:
 *
 * - Makes TypeScript show the full expanded object structure rather than type expressions
 * - Shows all properties in tooltips and error messages
 * - Preserves literal types in some contexts
 * - Improves IDE hover information by "flattening" the display
 */
export type Identity<T> = { [K in keyof T]: T[K] } & {}

interface Name {
  name: string
}

interface Age {
  age: number
}

/**
 * This shows as `type Person = Name & Age`
 */
type Person = Name & Age

type IdentityPerson = Identity<Person>

const foo = Date.now()

/**
 * This shows as `type AssignedPerson = {
    name: string;
    age: number;
}`
 */
type AssignedPerson = Assign<Name, Age>
