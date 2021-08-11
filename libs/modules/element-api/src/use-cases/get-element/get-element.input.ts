import { InputType } from '@nestjs/graphql'
import { GetElementGraphInput } from '../get-element-graph'

@InputType()
export class GetElementInput extends GetElementGraphInput {}
