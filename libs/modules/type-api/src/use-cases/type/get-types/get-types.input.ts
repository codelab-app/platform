import { Field, InputType, registerEnumType } from '@nestjs/graphql'

@InputType()
export class TypesByIdsFilter {
  @Field(() => [String])
  declare typeIds: Array<string>
}

export enum TypeKind {
  Primitive = 'Primitive',
  Array = 'Array',
  Interface = 'InterfaceType',
  Enum = 'Enum',
}

registerEnumType(TypeKind, { name: 'TypeKindFilter' })

@InputType()
export class TypesByKindFilter {
  @Field(() => TypeKind)
  declare kind: TypeKind
}

@InputType({
  description: 'Filters are optional and you can provide both of them together',
})
export class GetTypesInput {
  @Field(() => TypesByIdsFilter, { nullable: true })
  declare byIds?: TypesByIdsFilter

  @Field(() => TypesByKindFilter, { nullable: true })
  declare byKind?: TypesByKindFilter
}
