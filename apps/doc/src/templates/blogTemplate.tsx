import React from 'react'
import { Layout } from 'antd'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { css, Global } from '@emotion/react'
import { SidebarMenu } from '../components/SidebarMenu'
import { RecoilRoot } from 'recoil'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import '../styles/global.css'
import 'antd/dist/antd.less'

deckDeckGoHighlightElement()

const { Content, Header, Footer, Sider } = Layout

export interface Frontmatter {
  slug: string
  title: string
}

// https://www.gatsbyjs.com/blog/2019-11-21-how-to-convert-an-existing-gatsby-blog-to-use-mdx/
export default function Template(props) {
  console.log(props)

  const { data, pageContext } = props
  const { mdx } = data // data.markdownRemark holds your post data
  const { frontmatter, body } = mdx

  const pages: Array<Frontmatter> = pageContext.edges.map((edge) => {
    const {
      node: {
        frontmatter: { slug, title },
      },
    } = edge

    return {
      title,
      slug,
    }
  })

  return (
    <RecoilRoot>
      <Layout style={{ height: '100%' }}>
        <Global
          styles={css`
            #___gatsby,
            #gatsby-focus-wrapper {
              height: 100%;
            }
            .carbon {
              display: none !important;
            }
          `}
        />
        <Sider theme="light">
          <SidebarMenu
            pages={pages}
            currentPathname={props.location.pathname}
          />
        </Sider>
        <Layout>
          {/* <Header>Header</Header> */}
          <Content>
            <MDXRenderer>{body}</MDXRenderer>
            {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </RecoilRoot>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        # date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
