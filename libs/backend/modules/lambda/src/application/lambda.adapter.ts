import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphLambda } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Lambda } from '../domain/lambda.model'

@Injectable()
export class LambdaAdapter extends BaseAdapter<DgraphLambda, Lambda> {
  mapItem({ ownerId, name, uid, body }: DgraphLambda) {
    return new Lambda({ id: uid, ownerId, name, body })
  }
}
