import { gql } from 'graphql-request'

export const preRenderSchema = gql`
  enum PreRenderType {
    GetServerSideProps
    GetInitialProps
    GetStaticPaths
    GetStaticProps
  }

  type PreRender {
    id: ID!
    code: String!
    page: Page! @relationship(type: "PAGE_PRE_RENDER", direction: OUT)
    type: PreRenderType!
  }
`
