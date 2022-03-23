import { IResolvers } from '@graphql-tools/utils'
import { Atom } from '../../model'
import { MutationImportAtomsArgs } from '../../ogm-types.gen'

export const atomResolvers: IResolvers = {
  importAtoms: async (_source, args: MutationImportAtomsArgs) => {
    console.log('importAtoms');
    return null
    // const AtomModel = await Atom()
    // const payload: Array<any> = JSON.parse(args.input.payload as any)


    // const data = payload.map((atom: any) => {
    //   const tagIds = atom?.tags?.map((tag: any) => tag.id) || []

    //   const tagConnects = tagIds.map((id: string) => {
    //     return { where: { node: { id } } }
    //   })

    //   return {
    //     name: atom.name,
    //     type: atom.type,
    //     tags: {
    //       connect: tagConnects,
    //     },
    //     api: {
    //       connect: {
    //         where: {
    //           node: {
    //             id: atom.api?.id,
    //           },
    //         },
    //       },
    //     },
    //   }
    // })

    // return AtomModel.create({ input: data })
  },
}
