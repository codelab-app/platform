import { TypeKind } from '@codelab/shared/abstract/core'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'

@InputType()
export class TypesByIdsFilter {
  @Field(() => [String])
  declare typeIds: Array<string>
}

registerEnumType(TypeKind, { name: 'TypeKindFilter' })

@InputType()
export class TypesByKindFilter {
  @Field(() => TypeKind)
  declare kind: TypeKind
}

@InputType()
export class TypesByNameFilter {
  @Field()
  declare name: string
}

@InputType({
  description:
    'Filters are optional and you can provide all three of them together',
})
export class GetTypesInput {
  @Field(() => TypesByIdsFilter, { nullable: true })
  declare byIds?: TypesByIdsFilter

  @Field(() => TypesByKindFilter, { nullable: true })
  declare byKind?: TypesByKindFilter

  @Field(() => TypesByNameFilter, { nullable: true })
  declare byName?: TypesByNameFilter
}
