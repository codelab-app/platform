import React from 'react'
import AppItem from './AppItem'

const AppList = ({ viewer }: any) => (
  <div>
    {viewer.apps.edges.map(({ node }: any) => (
      <AppItem key={node.id} app={node} />
    ))}
  </div>
)

// export default createFragmentContainer(AppList, {
//   viewer: graphql`
//     query AppList_Query {
//       app_connection {
//         edges {
//           node {
//             ...AppItem_app
//           }
//         }
//       }
//     }
//   `,
// })

// export default createFragmentContainer(AppList, {
//   viewer: graphql`
//   fragment
//   `,
// })
