import { DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Response, Txn } from 'dgraph-js-http'
import { PropAggregate } from '../../models'
import { GetPropsInput } from './get-props.input'

interface PropsResponse extends Response {
  data: {
    props?: Array<PropAggregate>
  }
}

@Injectable()
export class GetPropsService extends DgraphUseCase<
  GetPropsInput,
  Array<PropAggregate>
> {
  executeTransaction(
    request: GetPropsInput,
    txn: Txn,
  ): Promise<Array<PropAggregate>> {
    const query = `
      {
        props(func: type(Prop)){
          id:uid
          description:Prop.description
          type:Prop.type{
            label:ValueType.label
            type:ValueType.type
            id:uid
          }
          props:Prop.props @facets(key:key){
            id:uid
            description:Prop.description
            type:Prop.type{
              label:ValueType.label
              type:ValueType.type
              id:uid
            }
          }
        }
      }
    `

    return txn.query(query).then((result: PropsResponse) => {
      const props = result?.data?.props?.filter((prop): prop is Prop => !!prop)

      if (!props) {
        throw new Error('Error while getting props')
      }

      return props
    })
  }
}
