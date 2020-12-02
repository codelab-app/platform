import { UserCreated } from './events/userCreated'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'
import { AggregateRoot, Result, UniqueEntityID } from '@codelab/ddd/shared/core'

interface UserProps {
  email: UserEmail
  password: UserPassword
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  /**
   * Used for hydrating the entity, Use Case should decide which fields to create
   *
   * @param props Already been validated via individual field's `create` method
   * @param id Determines whether we are creating new user, or hydarting an existing user object
   */
  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const isNewUser = !!id === false

    const user = new User(
      {
        ...props,
      },
      id,
    )

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user))
    }

    return Result.ok<User>(user)
  }
}
