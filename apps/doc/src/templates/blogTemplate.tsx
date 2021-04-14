import React from 'react'
import { Layout } from 'antd'
import { graphql } from 'gatsby'

import 'antd/dist/antd.less'
import { css, Global } from '@emotion/react'
import { SidebarMenu } from '../components/SidebarMenu'
import { RecoilRoot } from 'recoil'

const { Content, Header, Footer, Sider } = Layout

export interface Frontmatter {
  slug: string
  title: string
}

export default function Template(props) {
  const { data, pageContext } = props
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

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
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </RecoilRoot>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        # date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
