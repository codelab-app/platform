import type { Assign } from 'utility-types'

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

/**
 * This shows as `type AssignedPerson = {
    name: string;
    age: number;
}`
 */
type AssignedPerson = Assign<Name, Age>
