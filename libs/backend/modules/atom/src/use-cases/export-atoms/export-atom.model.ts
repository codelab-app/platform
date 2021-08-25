import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ExportAtom {
  @Field()
  declare payload: string
}
