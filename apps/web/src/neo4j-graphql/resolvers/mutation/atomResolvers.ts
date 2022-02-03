import { AtomsPayload } from '@codelab/frontend/modules/atom'
import { IResolvers } from '@graphql-tools/utils'
import { Atom } from '../../model'
import { MutationImportAtomsArgs } from '../../ogm-types.gen'

export const atomResolvers: IResolvers = {
  importAtoms: async (_source, args: MutationImportAtomsArgs) => {
    const payload: AtomsPayload = JSON.parse(args.input.payload)

    const data = payload.map((atom) => ({
      name: atom.name,
      type: atom.type,
    }))

    const results = await Atom().create({ input: data })

    return Promise.resolve({ atoms: results.atoms })
  },
}
