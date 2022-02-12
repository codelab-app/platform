import { AtomsPayload } from '@codelab/frontend/modules/atom'
import { MutationImportAtomsArgs } from '@codelab/shared/abstract/codegen-v2'
import { IResolvers } from '@graphql-tools/utils'
import { Atom } from './model'

export const resolvers: IResolvers = {
  Mutation: {
    importAtoms: async (_source, ctx: MutationImportAtomsArgs) => {
      const payload: AtomsPayload = JSON.parse(ctx.input.payload)

      const data = payload.map((atom) => ({
        name: atom.name,
        type: atom.type,
      }))

      const results = await Atom.create({ input: data })

      return Promise.resolve({ atoms: results.atoms })
    },
  },
  Query: {},
  // https://github.com/taion/graphql-type-json
  // JSON: GraphQLJSON,
  // JSONObject: GraphQLJSONObject,
}
