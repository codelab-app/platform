export interface DataMapperStrategy {
  execute(data: any): any
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
}
