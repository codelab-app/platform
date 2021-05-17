import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { User } from '../../user.model'
import { CreateUserInput } from './create-user.input'

@Injectable()
export class CreateUserService extends DgraphUseCase<CreateUserInput, User> {
  constructor(dgraph: DGraphService) {
    super(dgraph)
  }

  async executeTransaction(request: CreateUserInput, txn: Txn): Promise<User> {
    //https://discuss.dgraph.io/t/dgraph-dql-injection-prevention/13406
    const mu: Mutation = {
      setNquads: `
       _:user <email> "${request.email}" .
    `,
    }

    const r = await txn.mutate(mu)
    await txn.commit()

    const uid = r.data.uids.user

    const user = await this.dgraph.client.newTxn().query(`
      {
        query(func: uid(${uid})) {
          id: uid
          email
        }
      }
    `)

    return (user.data as any).query[0] as User
  }
}
