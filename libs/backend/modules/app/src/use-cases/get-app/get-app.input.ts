import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AppByIdFilter {
  @Field()
  declare appId: string
}

@InputType()
export class AppByPageFilter {
  @Field()
  declare pageId: string
}

@InputType()
export class GetAppInput {
  @Field(() => AppByIdFilter, { nullable: true })
  declare byId?: AppByIdFilter

  @Field(() => AppByPageFilter, { nullable: true })
  declare byPage?: AppByPageFilter
}
