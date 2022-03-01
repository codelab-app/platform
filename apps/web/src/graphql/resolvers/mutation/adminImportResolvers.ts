import { IResolvers } from '@graphql-tools/utils'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Atom, Tag, UnionType, ArrayType, InterfaceType, PrimitiveType, 
  LambdaType, AppType, RenderPropsType, ReactNodeType, PageType,
  MonacoType, ElementType } from '../../model'
import { MutationImportAdminDataArgs } from '../../ogm-types.gen'
import { v4 } from 'uuid'
import { getDriver } from '../../infra/driver'

export const adminImportResolvers: IResolvers = {
  importAdminData: async (_source, args: MutationImportAdminDataArgs) => {
    const driver = getDriver()
    console.log('driver session', driver.rxSession())
    const payload: any = JSON.parse(args.input.payload as any)
    

    const tagsInput = payload?.tags?.map((tag: any)=> {
      return {
        name: tag.name,
        parent: tag.parentTagId
          ? {
              connect: {
                where: {
                  node: {
                    id: tag.parentTagId,
                  },
                },
              },
            }
          : undefined,
        isRoot: tag.isRoot,
      }      
    })

    const atomsInput = payload?.atoms?.map((atom: any) => {
      const tagIds = atom?.tags?.map((tag: any)=>tag.id) || []
      const tagConnects = tagIds.map((id: string) => {
        return { where: { node: { id } } } }
      )

      return {
        name: atom.name,
        type: atom.type,
        tags: {
          connect: tagConnects
        },
        api: {
          connect: {
            where: {
              node: {
                id: atom.api?.id
              }
            }
          }
        }
      }
    })

    await Tag().create({input: tagsInput})
    await Promise.all(payload?.types?.map((typeInput: any) => {
      const common = {
        name: typeInput.name,
        owner: { connect: { where: { node: { auth0Id: payload.currentUserId } } } },
      }
      
      switch (typeInput.typeKind) {
        case TypeKind.UnionType:
          if (!typeInput.typesOfUnionType?.length) {
            throw new Error('Union item types not set')
          }
          const unionTypeInput = {
            ...common,
            typesOfUnionType: {
              connect: typeInput.typesOfUnionType.map((subType: any)=> ({where: {node: {id: subType.id}}}))
            }
          }
          UnionType().create({input: [unionTypeInput]})
        case TypeKind.ArrayType:
          if (!typeInput.arrayItemTypeId) {
            throw new Error('Array item type not set')
          }
    
          const arrayTypeInput = {
            ...common,
            itemType: {
              connect: typeInput.itemType?.map(((subType: any)=> ({where: { node: { id: subType.id}}})))
            },
          }
          ArrayType().create({input: [arrayTypeInput]})
        case TypeKind.InterfaceType:
          InterfaceType().create({input: [common]})
        case TypeKind.EnumType:
          if (!typeInput.allowedValues) {
            throw new Error('Invalid form input')
          }
    
          const enumInput = {
            ...common,
            allowedValues: {
              create: typeInput.allowedValues?.map((v: any) => ({
                node: { id: v4(), name: v.name, value: v.value },
              })),
            },
          }
          ArrayType().create({input: [enumInput]})
        case TypeKind.PrimitiveType:
          if (!typeInput.primitiveKind) {
            throw new Error('Primitive kind is required')
          }
    
          const primitiveInput = { ...common, primitiveKind: typeInput.primitiveKind }
          PrimitiveType().create({input: [primitiveInput]})
        case TypeKind.LambdaType:
          LambdaType().create({input: [common]})
        case TypeKind.AppType:
          AppType().create({input: [common]})
        case TypeKind.RenderPropsType:
          RenderPropsType().create({input: [common]})
        case TypeKind.ReactNodeType:
          ReactNodeType().create({input: [common]})
        case TypeKind.PageType:
          PageType().create({input: [common]})
        case TypeKind.MonacoType:
          if (!typeInput.language) {
            throw new Error('Language is required')
          }
    
          const monacoInput = { ...common, language: typeInput.language }
          MonacoType().create({input: [monacoInput]})
        case TypeKind.ElementType:
          if (!typeInput.elementKind) {
            throw new Error('Element kind is required')
          }
    
          const elementInput = { ...common, elementKind: typeInput.elementKind }
          ElementType().create({input: [elementInput] })
        default:
          throw new Error('Invalid create form type')
      }
    }))
    await Atom().create({ input: atomsInput })

    return Promise.resolve({ result: true })
  },
}
