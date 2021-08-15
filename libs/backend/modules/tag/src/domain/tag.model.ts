import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ defaultValue: false })
  isRoot?: boolean

  constructor({ id, name, isRoot = false }: Tag) {
    this.id = id
    this.name = name
    this.isRoot = isRoot
  }
}
