import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  parent?: string

  @Field(() => [String], { defaultValue: [] })
  children: Array<string>

  @Field({ defaultValue: false })
  isRoot?: boolean

  constructor({ id, name, isRoot = false, parent, children }: Tag) {
    this.id = id
    this.name = name
    this.isRoot = isRoot
    this.parent = parent
    this.children = children
  }
}
