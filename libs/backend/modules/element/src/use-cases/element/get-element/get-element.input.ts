import { InputType } from '@nestjs/graphql'
import { GetElementGraphInput } from '../get-element-graph/index'

@InputType()
export class GetElementInput extends GetElementGraphInput {}
