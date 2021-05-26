import { InputType } from '@nestjs/graphql'
import { CreatePageElementInput } from '../create-page-element'

@InputType()
export class ValidatePageElementInput extends CreatePageElementInput {}
