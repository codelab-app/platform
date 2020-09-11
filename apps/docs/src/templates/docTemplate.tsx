import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import { Frontmatter } from './docTemplate.i'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  ...props
}) {
  const { pageContext } = props

  const frontmatters: Array<Frontmatter> = pageContext.edges.map(
    ({ node }) => ({ ...node.frontmatter }),
  )
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout frontmatters={frontmatters} frontmatter={frontmatter}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        order
        path
        title
      }
    }
    # typedoc {
    #   id
    #   source {
    #     id
    #     kind
    #     name
    #   }
    #   internal {
    #     content
    #   }
    # }
  }
`
