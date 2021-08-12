import { gql, request } from 'graphql-request'
import { Query } from './Query'

const query = gql`
  {
    listings {
      id
      name
      images {
        handle
        fileName
        mimeType
      }
    }
  }
`

export default {
  component: Query,
  title: 'Query',
}

export const basic = () => {
  const fetchListings = async () =>
    request(
      'https://api-ap-northeast-1.graphcms.com/v2/cklhfqm7shxva01z67pdred46/master',
      query,
    ).then((data) => {
      // console.log(data)

      return data.listings
    })

  return <Query name="getListings" fetchCallback={fetchListings} />
}
