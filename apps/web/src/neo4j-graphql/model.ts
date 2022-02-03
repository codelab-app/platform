import { generate } from '@neo4j/graphql-ogm'
import * as path from 'path'
import { getOgm } from './getOgm'
import { AtomModel, InterfaceTypeModel, UserModel } from './ogm-types.gen'

let userInst: UserModel

export const User = () => (userInst ??= getOgm().model('User'))

let atomInst: AtomModel

export const Atom = () => (atomInst ??= getOgm().model('Atom'))

let interfaceInst: InterfaceTypeModel

export const InterfaceType = () =>
  (interfaceInst ??= getOgm().model('InterfaceType'))

export const generateOgmTypes = async () => {
  // Only generate types when you make a schema change
  const outFile = path.resolve(
    process.cwd(),
    'apps/web/src/neo4j-graphql',
    'ogm-types.gen.ts',
  )

  console.log(outFile)

  await generate({
    ogm: getOgm(),
    outFile,
  })

  console.log('Types Generated')
}
