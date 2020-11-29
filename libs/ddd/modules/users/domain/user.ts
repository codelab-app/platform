import { UserCreated } from './events/userCreated'
import {
  AggregateRoot,
  Guard,
  Result,
  UniqueEntityID,
} from '@codelab/ddd/shared/domain'

interface UserProps {
  email: string
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.email, argumentName: 'email' },
    ])

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }

    const isNewUser = !!id === false
    const user = new User(
      {
        ...props,
        // isDeleted: props.isDeleted ? props.isDeleted : false,
        // isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
        // isAdminUser: props.isAdminUser ? props.isAdminUser : false,
      },
      id,
    )

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user))
    }

    return Result.ok<User>(user)
  }
}
