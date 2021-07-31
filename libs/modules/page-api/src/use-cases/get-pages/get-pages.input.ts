import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PageByAppFilter {
  @Field()
  declare appId: string
}

@InputType()
export class GetPagesInput {
  @Field(() => PageByAppFilter)
  declare byApp: PageByAppFilter
}
