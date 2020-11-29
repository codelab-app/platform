import { User } from '../user'
import { IDomainEvent, UniqueEntityID } from '@codelab/ddd/shared/domain'

export class UserCreated implements IDomainEvent {
  public dateTimeOccurred: Date

  public user: User

  constructor(user: User) {
    this.dateTimeOccurred = new Date()
    this.user = user
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id
  }
}
