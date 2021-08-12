import { CreateAppInput } from './create-app.input'

export class CreateAppRequest {
  declare input: CreateAppInput

  declare ownerId: string
}
