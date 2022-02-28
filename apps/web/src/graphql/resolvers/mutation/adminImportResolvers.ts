import { IResolvers } from '@graphql-tools/utils'
import { Tag } from '../../model'
import {
  MutationImportAdminDataArgs,
  Tag as TagFragment,
} from '../../ogm-types.gen'

export const adminImportResolvers: IResolvers = {
  importAdminData: async (
    _source,
    args: MutationImportAdminDataArgs,
    req: any,
  ) => {
    const currentUserId = req.jwt?.sub
    const payload: any = JSON.parse(args.input.payload as any)
    const createdTagInfo: Record<string, TagFragment> = {} // define record variable for search performance.

    payload.tags?.map(async (tag: any) => {
      if (createdTagInfo[tag.name]) {
        return
      } // continue if tag name was recorded already

      const common = { name: tag.name, isRoot: tag.isRoot }
      let tagCreateInput: any = { ...common }

      if (tag.parent) {
        // if tag has parent element, check whether parent is imported or not

        console.log('start to find tag.......')

        const tagFound: Array<TagFragment> = await Tag().find({
          where: { name: tag.parent.name },
        })

        console.log('end find tag with.......', tagFound[0])

        let parentTag = tagFound[0]

        if (!parentTag && !createdTagInfo[parentTag?.name]) {
          console.log('start to create parent tag if not exist.......')

          const createdTag = await Tag().create({
            input: [{ name: tag.parent.name, isRoot: tag.parent.isRoot }],
          })

          console.log('end to create parent tag if not exist.......', parentTag)
          parentTag = createdTag.tags[0]
        }

        createdTagInfo[parentTag.name] = parentTag
        tagCreateInput = {
          ...tagCreateInput,
          parent: { connect: { where: { node: { id: parentTag.id } } } },
        }
      }

      console.log('start to create tag in main')

      const tagCreated = await Tag().create({ input: [tagCreateInput] })
      createdTagInfo[tagCreated.tags[0]?.name] = tagCreated.tags[0]
      console.log('end to create tag in main')
    })

    // const tagsInput = payload?.tags?.map((tag: any)=> {
    //   return {
    //     name: tag.name,
    //     parent: tag.parentTagId
    //       ? {
    //           connect: {
    //             where: {
    //               node: {
    //                 id: tag.parentTagId,
    //               },
    //             },
    //           },
    //         }
    //       : undefined,
    //     isRoot: tag.isRoot,
    //   }
    // })

    // const atomsInput = payload?.atoms?.map((atom: any) => {
    //   const tagIds = atom?.tags?.map((tag: any)=>tag.id) || []
    //   const tagConnects = tagIds.map((id: string) => {
    //     return { where: { node: { id } } } }
    //   )

    //   return {
    //     name: atom.name,
    //     type: atom.type,
    //     tags: {
    //       connect: tagConnects
    //     },
    //     api: {
    //       connect: {
    //         where: {
    //           node: {
    //             id: atom.api?.id
    //           }
    //         }
    //       }
    //     }
    //   }
    // })

    // await Tag().create({input: tagsInput})
    // await Promise.all(payload?.types?.map((typeInput: any) => {
    //   const common = {
    //     name: typeInput.name,
    //     owner: { connect: { where: { node: { auth0Id: payload.currentUserId } } } },
    //   }

    //   switch (typeInput.typeKind) {
    //     case TypeKind.UnionType:
    //       if (!typeInput.typesOfUnionType?.length) {
    //         throw new Error('Union item types not set')
    //       }
    //       const unionTypeInput = {
    //         ...common,
    //         typesOfUnionType: {
    //           connect: typeInput.typesOfUnionType.map((subType: any)=> ({where: {node: {id: subType.id}}}))
    //         }
    //       }
    //       UnionType().create({input: [unionTypeInput]})
    //     case TypeKind.ArrayType:
    //       if (!typeInput.arrayItemTypeId) {
    //         throw new Error('Array item type not set')
    //       }

    //       const arrayTypeInput = {
    //         ...common,
    //         itemType: {
    //           connect: typeInput.itemType?.map(((subType: any)=> ({where: { node: { id: subType.id}}})))
    //         },
    //       }
    //       ArrayType().create({input: [arrayTypeInput]})
    //     case TypeKind.InterfaceType:
    //       InterfaceType().create({input: [common]})
    //     case TypeKind.EnumType:
    //       if (!typeInput.allowedValues) {
    //         throw new Error('Invalid form input')
    //       }

    //       const enumInput = {
    //         ...common,
    //         allowedValues: {
    //           create: typeInput.allowedValues?.map((v: any) => ({
    //             node: { id: v4(), name: v.name, value: v.value },
    //           })),
    //         },
    //       }
    //       ArrayType().create({input: [enumInput]})
    //     case TypeKind.PrimitiveType:
    //       if (!typeInput.primitiveKind) {
    //         throw new Error('Primitive kind is required')
    //       }

    //       const primitiveInput = { ...common, primitiveKind: typeInput.primitiveKind }
    //       PrimitiveType().create({input: [primitiveInput]})
    //     case TypeKind.LambdaType:
    //       LambdaType().create({input: [common]})
    //     case TypeKind.AppType:
    //       AppType().create({input: [common]})
    //     case TypeKind.RenderPropsType:
    //       RenderPropsType().create({input: [common]})
    //     case TypeKind.ReactNodeType:
    //       ReactNodeType().create({input: [common]})
    //     case TypeKind.PageType:
    //       PageType().create({input: [common]})
    //     case TypeKind.MonacoType:
    //       if (!typeInput.language) {
    //         throw new Error('Language is required')
    //       }

    //       const monacoInput = { ...common, language: typeInput.language }
    //       MonacoType().create({input: [monacoInput]})
    //     case TypeKind.ElementType:
    //       if (!typeInput.elementKind) {
    //         throw new Error('Element kind is required')
    //       }

    //       const elementInput = { ...common, elementKind: typeInput.elementKind }
    //       ElementType().create({input: [elementInput] })
    //     default:
    //       throw new Error('Invalid create form type')
    //   }
    // }))
    // await Atom().create({ input: atomsInput })

    return Promise.resolve({ result: true })
  },
}
