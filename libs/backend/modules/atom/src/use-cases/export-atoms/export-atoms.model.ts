import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ExportAtoms {
  @Field()
  declare payload: string
}
