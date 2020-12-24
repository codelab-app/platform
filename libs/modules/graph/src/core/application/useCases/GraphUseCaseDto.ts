import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GraphUseCaseDto {
  @Field({ nullable: true })
  public declare id?: string

  @Field({ nullable: true })
  public declare label?: string

  // @Field((returns) => [VertexUseCaseDto])
  // declare vertices: Array<VertexUseCaseDto>

  // @Field((returns) => [EdgeUseCaseDto])
  // declare edges: Array<EdgeUseCaseDto>
}
