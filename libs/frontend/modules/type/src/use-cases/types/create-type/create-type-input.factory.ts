// export const typeFactory = (
//   formData: ICreateTypeDTO,
//   currentUserId: string,
// ) => {
//   const id = v4()
//   const name = formData.name
//   const ownerAuth0Id = currentUserId
//   const common = { id, name, ownerAuth0Id }
//
//   switch (formData.kind) {
//     case ITypeKind.UnionType:
//       if (
//         !(formData.typeIdsOfUnionType && formData.typeIdsOfUnionType.length > 0)
//       ) {
//         throw new Error('Union item types not set')
//       }
//
//       return new UnionType({
//         ...common,
//         typesOfUnionType: formData.typeIdsOfUnionType.map((typeId) =>
//           typeRef(typeId),
//         ),
//       })
//
//     case ITypeKind.ArrayType:
//       if (!formData.arrayItemTypeId) {
//         throw new Error('Array item type not set')
//       }
//
//       return new ArrayType({
//         ...common,
//         itemType: typeRef(formData.arrayItemTypeId),
//       })
//     case ITypeKind.InterfaceType:
//       return new InterfaceType(common)
//     case ITypeKind.EnumType:
//       if (!formData.allowedValues) {
//         throw new Error('Invalid form input')
//       }
//
//       return new EnumType({
//         ...common,
//         allowedValues: formData.allowedValues.map(
//           (av) => new EnumTypeValue(av),
//         ),
//       })
//
//     case ITypeKind.PrimitiveType:
//       if (!formData.primitiveKind) {
//         throw new Error('Primitive kind is required')
//       }
//
//       return new PrimitiveType({
//         ...common,
//         primitiveKind: formData.primitiveKind,
//       })
//     case ITypeKind.LambdaType:
//       return new LambdaType(common)
//     case ITypeKind.AppType:
//       return new AppType(common)
//     case ITypeKind.RenderPropsType:
//       return new RenderPropsType(common)
//     case ITypeKind.ReactNodeType:
//       return new ReactNodeType(common)
//     case ITypeKind.PageType:
//       return new PageType(common)
//     case ITypeKind.MonacoType:
//       if (!formData.language) {
//         throw new Error('Language is required')
//       }
//
//       return new MonacoType({ ...common, language: formData.language })
//     case ITypeKind.ElementType:
//       if (!formData.elementKind) {
//         throw new Error('Element kind is required')
//       }
//
//       return new ElementType({ ...common, elementKind: formData.elementKind })
//     default:
//       throw new Error('Invalid create form type')
//   }
// }
