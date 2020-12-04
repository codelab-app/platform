import { ValidateNested } from 'class-validator'
import { Option } from 'fp-ts/Option'
import { UUID } from './valueObject/UUID'

export class Entity<P> {
  @ValidateNested()
  protected declare id: Option<UUID>
}
