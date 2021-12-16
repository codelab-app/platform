import { CreateResponsePort } from '@codelab/backend/abstract/core'
import {
  DgraphEntityType,
  DgraphRepository,
  ITransaction,
} from '@codelab/backend/infra'
import { IProps } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { IPropsRepository } from './props-repository.interface'

// TODO move this to prop module
@Injectable()
export class PropsRepository implements IPropsRepository {
  constructor(protected dgraph: DgraphRepository) {}

  public static mutation(props: IProps) {
    const uid = props.id ?? DgraphRepository.randomBlankNode()

    return {
      uid,
      'dgraph.type': [DgraphEntityType.Prop],
      data: props.data,
    }
  }

  async save(
    props: IProps,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    const mutation = PropsRepository.mutation(props)
    const response = await transaction.mutate({ setJson: mutation })

    return {
      id: props.id ?? this.dgraph.getUid(response, mutation.uid),
    }
  }
}
