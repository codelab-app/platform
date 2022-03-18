import { AtomsPayload } from '@codelab/frontend/modules/atom'
import { IResolvers } from '@graphql-tools/utils'
import { flatMap } from 'lodash'
import { Atom } from '../../model'
import { MutationImportAtomsArgs } from '../../ogm-types.gen'

export const atomMutationResolvers: IResolvers = {
  importAtoms: async (_source, args: MutationImportAtomsArgs) => {
    const payload: AtomsPayload =
      flatMap(
        args.input.payload?.map((i) => JSON.parse(i)),
        (i) => (Array.isArray(i) ? i : [i]),
      ) ?? []

    const data = payload.map((atom) => ({
      name: atom.name,
      type: atom.type,
    }))

    // TODO import atom.api
    const results = await Atom().then((AtomModel) =>
      AtomModel.create({ input: data }),
    )

    return Promise.resolve({ atoms: results.atoms })
  },
}
