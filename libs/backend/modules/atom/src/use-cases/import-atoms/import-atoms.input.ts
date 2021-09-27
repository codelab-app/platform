import { BasePayloadInput } from '@codelab/backend/application'
import { InputType } from '@nestjs/graphql'

@InputType()
export class ImportAtomsInput extends BasePayloadInput {}
