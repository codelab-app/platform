// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AtomTypeEnum } from '../../../modules/atom-api/src/atom-type.model'

const atomTypes = Object.values(AtomTypeEnum).map((atomType) => ({
  label: atomType.replace(/_/g, ' '),
  type: AtomTypeEnum[atomType],
}))

const valueTypes = [
  { label: 'Boolean', type: 'Boolean' },
  { label: 'Lambda', type: 'Lambda' },
  { label: 'Number', type: 'Number' },
  { label: 'String', type: 'String' },
  { label: 'Enum', type: 'Enum' },
]

export const mutation = `
  _:adminUser <User.email> "admin@codelab.ai" .
  _:adminUser <dgraph.type> "User" .
  _:adminUser <User.libraries> _:antdlib .

  _:antdlib <Library.owner> _:adminUser .
  _:antdlib <Library.name> "Ant design Library" .
  _:antdlib <dgraph.type> "Library" .

  ${atomTypes.reduce(
    (prev, atomType, n) =>
      prev +
      `
      _:atomType${n} <dgraph.type> "Atom" .
      _:atomType${n} <Atom.label> "${atomType.label}" .
      _:atomType${n} <Atom.type> "${atomType.type}" .
  `,
    '',
  )}
  ${valueTypes.reduce(
    (prev, valueType, n) =>
      prev +
      `
      _:valueType${n} <dgraph.type> "ValueType" .
      _:valueType${n} <ValueType.label> "${valueType.label}" .
      _:valueType${n} <ValueType.type> "${valueType.type}" .
  `,
    '',
  )}
`
