import { InputType } from '@nestjs/graphql'
import { CreateElementInput } from '../../../use-cases/element/create-element'

@InputType()
export class CreateComponentInput extends CreateElementInput {}
