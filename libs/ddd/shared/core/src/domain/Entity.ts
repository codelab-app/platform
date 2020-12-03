import { Option } from 'fp-ts/Option'

export class Entity<ID extends string | number> {
  protected declare id: Option<ID>
}
