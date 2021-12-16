import { ObjectRef } from '@codelab/backend/abstract/core'
import { ITag } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag implements ITag {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => ObjectRef, { nullable: true })
  owner?: ObjectRef | null

  @Field(() => String, { nullable: true })
  parent?: string | null

  @Field(() => [String], { defaultValue: [] })
  children: Array<string>

  @Field()
  isRoot: boolean

  constructor({ id, name, isRoot = false, parent, children, owner }: Tag) {
    this.id = id
    this.name = name
    this.isRoot = isRoot
    this.parent = parent
    this.owner = owner
    this.children = children
  }
}
