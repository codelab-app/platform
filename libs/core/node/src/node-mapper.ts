import { omit } from 'lodash'

export interface DataMapperStrategy {
  execute(data: any): any
  revert(data: any): any
}

/**
 * This strategy maps data from Form to format required for Restify api call
 */
export class CreateFormStrategy implements DataMapperStrategy {
  execute(data: any) {
    // Do mapping logic here
    if (!data.props) return { ...data, props: [] }

    return data
  }

  revert(data: any) {
    // Revert data returned from Restify api to form/table format
    const mappedData = (Array.isArray(data) ? data : [data])
      // eslint-disable-next-line no-underscore-dangle
      .map((node: any) => ({ id: node._id, ...omit(node, '_id') }))

    return Array.isArray(data) ? mappedData : mappedData[0]
  }
}
