import { generate, OGM } from '@neo4j/graphql-ogm'
import { ESLint } from 'eslint'
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

  await generate({
    ogm: getOgm(),
    outFile,
  })

  const results = await getEslint().lintFiles(outFile)

  await ESLint.outputFixes(results)
}

let eslint: ESLint
const getEslint = () => (eslint ??= new ESLint({ fix: true }))
