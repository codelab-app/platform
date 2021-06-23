import {
  DgraphArrayMapper,
  DgraphProvider,
  DgraphQueryField,
  DgraphTokens,
  DgraphUseCase,
  UidFilter,
} from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import {
  DgraphInterfaceValueFields,
  DgraphProp,
  DgraphPropFields,
  Prop,
  PropAggregate,
  PropAggregateMapper,
  PropMapper,
} from '../../models'
import { GetPropsInput } from './get-props.input'
import { GetPropsQueryBuilder, GetPropsQueryResult } from './get-props.query'

@Injectable()
export class GetPropsService extends DgraphUseCase<GetPropsInput, Array<Prop>> {
  private propArrayMapper: DgraphArrayMapper<DgraphProp, Prop>

  private propAggregateArrayMapper: DgraphArrayMapper<Prop, PropAggregate>

  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private propMapper: PropMapper,
    private propAggregateMapper: PropAggregateMapper,
  ) {
    super(dgraphProvider)
    this.propArrayMapper = new DgraphArrayMapper(propMapper)
    this.propAggregateArrayMapper = new DgraphArrayMapper(propAggregateMapper)
  }

  protected async executeTransaction(
    { byPageElement, byInterfaceValue, byIds }: GetPropsInput,
    txn: Txn,
  ): Promise<Array<Prop>> {
    if (
      [byIds, byPageElement, byInterfaceValue].filter((f) => !!f).length > 1
    ) {
      throw new Error('Provide only 1 filter to getProps')
    }

    if (byPageElement) {
      if (!byPageElement.pageElementId) {
        throw new Error('pageElementId not provided')
      }

      const queryBuilder = new GetPropsQueryBuilder()
        .withFields('PageElement.props')
        .withUidFunc(byPageElement.pageElementId)

      if (byPageElement.fieldId) {
        queryBuilder
          .getField(DgraphPropFields.field)
          ?.withFilters(new UidFilter(byPageElement.fieldId))
      }

      const query = queryBuilder.build()
      const response = await txn.query(query)

      const data = (response.data as any).query as Array<
        GetPropsQueryResult & {
          'PageElement.props': Array<GetPropsQueryResult>
        }
      >

      if (!data || !data[0]) {
        throw new Error('Error while getting props')
      }

      if (
        !data[0]['PageElement.props'] ||
        data[0]['PageElement.props'].length === 0
      ) {
        return []
      }

      let props = data[0]['PageElement.props']

      if (byPageElement.fieldId) {
        props = props.filter((p) => !!p[DgraphPropFields.field])
      }

      return await this.propArrayMapper.map(props)
    } else if (byIds) {
      const query = new GetPropsQueryBuilder()
        .withUidsFunc(byIds.propIds)
        .build()

      const response = await txn.query(query)
      const data = (response.data as any).query as Array<GetPropsQueryResult>

      return await this.propArrayMapper.map(data)
    } else if (byInterfaceValue) {
      if (!byInterfaceValue.interfaceValueId) {
        throw new Error('interfaceValueId not provided')
      }

      const query = new GetPropsQueryBuilder()
        .withFields(DgraphInterfaceValueFields.props)
        .build()

      const response = await txn.query(query)

      const data = (response.data as any).query as Array<
        GetPropsQueryResult & {
          [DgraphInterfaceValueFields.props]: Array<GetPropsQueryResult>
        }
      >

      if (!data || !data[0]) {
        throw new Error('Error while getting props')
      }

      if (
        !data[0][DgraphInterfaceValueFields.props] ||
        data[0][DgraphInterfaceValueFields.props].length === 0
      ) {
        return []
      }

      return await this.propArrayMapper.map(
        data[0][DgraphInterfaceValueFields.props],
      )
    } else {
      throw new Error('At least one filter must be provided to getProps')
    }
  }
}
