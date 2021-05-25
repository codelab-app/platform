import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreatePageElementInput {
  @Field()
  declare name: string

  @Field({ nullable: true })
  declare atomId?: string

  //Not nullable, because we always want to attach it somewhere and we always have a root page element to attach to
  @Field()
  declare parentPageElementId: string

  @Field(() => Int, {
    nullable: true,
    description:
      'Leave it out to automatically set it as the last order of all the children',
  })
  declare order?: number | null
}
