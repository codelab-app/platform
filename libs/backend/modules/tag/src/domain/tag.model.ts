import { ObjectRef } from '@codelab/backend/abstract/core'
import { ITag } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag implements ITag {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => ObjectRef, { nullable: true })
  owner?: Nullable<ObjectRef>

  @Field(() => String, { nullable: true })
  parent?: Nullable<string>

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
