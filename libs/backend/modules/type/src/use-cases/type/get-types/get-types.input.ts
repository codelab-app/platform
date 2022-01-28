import { ITypesWhere } from '@codelab/backend/abstract/core'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'

registerEnumType(TypeKind, { name: 'TypeKind' })

@InputType({
  description: 'Provide exactly no more than 1 filter',
})
export class TypesWhereInput implements ITypesWhere {
  @Field(() => [String], { nullable: true })
  declare ids?: Array<string>

  @Field(() => TypeKind, { nullable: true })
  declare kind?: TypeKind

  @Field(() => String, { nullable: true })
  declare name?: string
}

@InputType()
export class GetTypesInput {
  @Field(() => TypesWhereInput, { nullable: true })
  declare where?: TypesWhereInput
}
