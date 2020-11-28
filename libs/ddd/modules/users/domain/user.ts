import { AggregateRoot, UniqueEntityID } from '@codelab/ddd/shared/domain'

interface UserProps {
  email: string
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }
}
